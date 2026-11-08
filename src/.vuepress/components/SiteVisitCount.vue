<script setup lang="ts">
import { computed } from "vue";
import {
  siteVisitCount,
  siteVisitCountFailed,
  siteVisitorCount,
} from "../visit-count";

function formatMetric(value: number | null, failed: boolean): string {
  if (failed) return "暂不可用";
  if (value === null) return "加载中...";
  return value.toLocaleString("zh-CN");
}

const pvText = computed(() =>
  formatMetric(siteVisitCount.value, siteVisitCountFailed.value),
);
const uvText = computed(() =>
  formatMetric(siteVisitorCount.value, siteVisitCountFailed.value),
);

const isPvReady = computed(
  () => !siteVisitCountFailed.value && siteVisitCount.value !== null,
);
const isUvReady = computed(
  () => !siteVisitCountFailed.value && siteVisitorCount.value !== null,
);
</script>

<template>
  <section class="vp-visit-panel" aria-label="网站访问统计">
    <div class="vp-visit-panel__header">
      <svg
        class="vp-visit-panel__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
      <span class="vp-visit-panel__title">访问统计</span>
    </div>

    <div class="vp-visit-panel__grid">
      <div class="vp-visit-card">
        <div class="vp-visit-card__label">
          <svg
            class="vp-visit-card__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>本站总访问量</span>
        </div>
        <div class="vp-visit-card__metric">
          <span
            id="vercount_value_site_pv"
            class="vp-visit-card__value"
            :class="{ 'is-placeholder': !isPvReady }"
            aria-live="polite"
          >
            {{ pvText }}
          </span>
          <span v-if="!siteVisitCountFailed" class="vp-visit-card__unit">次</span>
        </div>
      </div>

      <div class="vp-visit-card">
        <div class="vp-visit-card__label">
          <svg
            class="vp-visit-card__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>本站总访客数</span>
        </div>
        <div class="vp-visit-card__metric">
          <span
            id="vercount_value_site_uv"
            class="vp-visit-card__value"
            :class="{ 'is-placeholder': !isUvReady }"
            aria-live="polite"
          >
            {{ uvText }}
          </span>
          <span v-if="!siteVisitCountFailed" class="vp-visit-card__unit">人</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.vp-visit-panel {
  margin-block: 0.75rem;
  padding: 0.75rem 1rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  background: var(--vp-c-bg-alt);
  transition:
    background var(--vp-t-color),
    border-color var(--vp-t-color);

  @media (max-width: 419px) {
    margin-inline: -0.75rem;
  }

  @media print {
    break-inside: avoid;
  }
}

.vp-visit-panel__header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.65rem;
  color: var(--vp-c-text);
  font-weight: 600;
  font-size: 0.92rem;
  line-height: 1.25;
}

.vp-visit-panel__icon {
  flex-shrink: 0;
  width: 1.1rem;
  height: 1.1rem;
  color: var(--vp-c-accent);
}

.vp-visit-panel__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 419px) {
    grid-template-columns: 1fr;
    gap: 0.55rem;
  }
}

.vp-visit-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.45rem;
  background: var(--vp-c-bg-elv);
  transition:
    background var(--vp-t-color),
    border-color var(--vp-t-color),
    box-shadow var(--vp-t-transform);

  &:hover {
    border-color: var(--vp-c-border);
    box-shadow: 0 2px 6px -1px var(--vp-c-shadow);
  }
}

.vp-visit-card__label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--vp-c-text-mute);
  font-size: 0.82rem;
  line-height: 1.3;
}

.vp-visit-card__icon {
  flex-shrink: 0;
  width: 0.92rem;
  height: 0.92rem;
  color: var(--vp-c-accent);
  opacity: 0.88;
}

.vp-visit-card__metric {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  min-height: 1.75rem;
}

.vp-visit-card__value {
  color: var(--vp-c-accent);
  font-weight: 700;
  font-size: 1.35rem;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;

  &.is-placeholder {
    color: var(--vp-c-text-subtle);
    font-weight: 500;
    font-size: 0.95rem;
  }
}

.vp-visit-card__unit {
  color: var(--vp-c-text-mute);
  font-size: 0.82rem;
  line-height: 1;
}
</style>
