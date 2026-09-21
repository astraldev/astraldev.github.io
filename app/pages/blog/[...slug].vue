<script lang="ts" setup>
const PostStyle = {
  header: {
    root: "border-b-0 pb-0",
    title: "title-colors text-3xl sm:text-4xl",
  },
  toc: "static lg:sticky mx-0 px-4 sm:mx-0 sm:px-4 lg:mx-0 lg:px-0 rounded-lg lg:rounded-none"
    + " border lg:border-0 border-zinc-500/20"
    + " bg-zinc-300/40 dark:bg-white/5 lg:bg-transparent lg:dark:bg-transparent",
} as const;

const route = useRoute();

const path = computed(() => route.path.replace(/\/+$/, "") || "/");

const { data: page } = await useAsyncData(path.value, () => {
  return queryCollection("blog").path(path.value).first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
  ogType: "article",
  articleAuthor: ["Ekure Edem"],
  articlePublishedTime: page.value?.date,
  articleTag: page.value?.tags,
  twitterCard: "summary_large_image",
});

// Drafts stay out of search results even if a link leaks.
if (page.value?.draft) {
  useHead({ meta: [{ name: "robots", content: "noindex, nofollow" }] });
}
</script>

<template>
  <UContainer
    v-if="page"
    class="py-12 md:py-20"
  >
    <UPageHeader
      :title="page.title"
      :ui="PostStyle.header"
    />

    <UPage class="mt-8">
      <UPageBody>
        <ContentRenderer :value="page" />

        <SharePost
          :title="page.title"
          :path="page.path"
          wrapper-class="mt-12 lg:hidden"
        />
      </UPageBody>

      <template #right>
        <UContentToc
          title="On this page"
          highlight
          :links="page.body?.toc?.links"
          :class="PostStyle.toc"
        >
          <template #bottom>
            <SharePost
              :title="page.title"
              :path="page.path"
            />

            <FollowIt />
          </template>
        </UContentToc>
      </template>
    </UPage>
  </UContainer>
</template>
