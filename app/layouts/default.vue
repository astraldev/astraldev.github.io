<script setup lang="ts">
const route = useRoute();

// The homepage carries its own navigation in the hero, so the bar stays off there.
const showHeader = computed(() => route.path !== "/");
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <SiteHeader v-if="showHeader" />
    <main class="flex-1 page-grid">
      <slot />
    </main>
    <custom-footer />
  </div>
</template>
