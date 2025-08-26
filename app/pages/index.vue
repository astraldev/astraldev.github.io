<template>
  <div>
    <div class="accented-bg -z-20 fixed inset-0 pointer-events-none">
      <span class="blur-2xl" />
      <span class="blur-2xl" />
      <span class="blur-2xl" />
    </div>
    <div class="-z-10 fixed inset-0 pointer-events-none backdrop-blur-lg" />
    <div class="fixed inset-x-1.5 md:inset-x-8 lg:inset-x-16 inset-y-0 pointer-events-none border-x glass-border" />

    <main class="px-8 md:px-16 lg:px-24">
      <LandingSection />
      <AboutMe />
    </main>
    <!--
  <timeline class="md:hidden" />
  <projects class="md:hidden" />
  <skills />
  <div class="hidden md:flex items-center justify-center" id="works">
    <timeline ref="tl" no-id />
    <projects ref="pr" no-id />
  </div>
  <contact />
  <custom-footer /> -->
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="css">
@import "~/assets/css/base.css";
</style>
