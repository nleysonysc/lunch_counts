<script setup>
  import { ref, watch } from 'vue'
  import { useAssetStore } from '../stores/assetStore'
  import { useRouter } from 'vue-router'
  import QuickScan from "../components/QuickScan.vue"

  let assetStore = useAssetStore();


</script>

<template>
  <QuickScan />
</template>

<style scoped>

</style>
