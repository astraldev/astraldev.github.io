<script setup lang="ts">
const route = useRoute();

// The homepage carries its own navigation in the hero, so the bar stays off there.
const showHeader = computed(() => route.path !== "/");
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-default focus:px-4 focus:py-2 focus:ring-2 focus:ring-primary"
    >
      Skip to content
    </a>
    <SiteHeader v-if="showHeader" />
    <main
      id="main"
      tabindex="-1"
      class="flex-1 page-grid focus:outline-none"
    >
      <slot />
    </main>
    <custom-footer />
  </div>
</template>
