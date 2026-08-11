<template>
  <div class="blog-shell flex flex-col min-h-screen">
    <main class="flex-1 page-grid">
      <slot />
    </main>
    <custom-footer />
  </div>
</template>

<style lang="scss" scoped>
.blog-shell {
  --ui-header-height: 0px;
}
</style>
