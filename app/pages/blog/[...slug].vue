<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
});
</script>

<template>
  <UPage>
    <UPageBody>
      <ContentRenderer
        v-if="page"
        :value="page"
      />
    </UPageBody>
  </UPage>
</template>
