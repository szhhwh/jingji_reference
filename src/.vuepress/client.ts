import { onMounted, watch } from "vue";
import { defineClientConfig, useRoute } from "vuepress/client";
import SiteVisitCount from "./components/SiteVisitCount.vue";
import {
  siteVisitCount,
  siteVisitCountFailed,
  siteVisitorCount,
} from "./visit-count";

let latestRequest = 0;

async function recordVisit(url: string): Promise<void> {
  const request = ++latestRequest;
  siteVisitCount.value = null;
  siteVisitorCount.value = null;
  siteVisitCountFailed.value = false;

  // Match Vercount's existing per-host visitor cookie to preserve UV tracking.
  const cookieName = `vercount_uv_${window.location.host.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
  const isNewUv = !document.cookie.split("; ").some((cookie) => cookie === `${cookieName}=1`);
  if (isNewUv) {
    document.cookie = `${cookieName}=1; path=/; max-age=31536000; samesite=lax`;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch("https://events.vercount.one/api/v2/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, isNewUv }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    const sitePv = result?.data?.site_pv;
    const siteUv = result?.data?.site_uv;
    if (
      result?.status !== "success" ||
      typeof sitePv !== "number" ||
      !Number.isFinite(sitePv) ||
      typeof siteUv !== "number" ||
      !Number.isFinite(siteUv)
    ) {
      throw new Error("Invalid Vercount response");
    }
    if (request === latestRequest) {
      siteVisitCount.value = sitePv;
      siteVisitorCount.value = siteUv;
    }
  } catch {
    if (request === latestRequest) siteVisitCountFailed.value = true;
  } finally {
    window.clearTimeout(timeout);
  }
}

export default defineClientConfig({
  enhance({ app }) {
    app.component("SiteVisitCount", SiteVisitCount);
  },
  setup() {
    const route = useRoute();
    onMounted(() => {
      // Ignore anchor-only changes, but record each page or query navigation once.
      watch(() => route.fullPath.split("#", 1)[0], () => {
        void recordVisit(window.location.href);
      }, { immediate: true, flush: "post" });
    });
  },
});
