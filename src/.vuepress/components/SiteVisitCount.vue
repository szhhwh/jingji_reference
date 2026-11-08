<script setup lang="ts">
import { siteVisitCount, siteVisitCountFailed } from "../visit-count";
</script>

<template>
  <span id="vercount_value_site_pv" aria-live="polite">{{
    siteVisitCountFailed ? "暂不可用" : siteVisitCount ?? "加载中"
  }}</span>
</template>
