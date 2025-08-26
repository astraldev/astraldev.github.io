<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
useHead({
  meta: [
    { name: "darkreader-lock" },
  ],
});
</script>
