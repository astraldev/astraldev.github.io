<script lang="ts" setup>
const PostStyle = {
  backLink: {
    base: "gap-2 rounded-full px-4 py-2 hover:text-primary",
    leadingIcon: "size-4 -translate-y-px",
  },
  header: {
    root: "border-b-0 pb-0",
    title: "title-colors text-3xl sm:text-4xl",
    description: "subtitle-colors text-lg",
  },
  toc: "static lg:sticky mx-0 px-4 sm:mx-0 sm:px-4 lg:-mx-4 rounded-lg lg:rounded-none"
    + " border lg:border-0 border-zinc-500/20"
    + " bg-zinc-300/40 dark:bg-white/5 lg:bg-transparent lg:dark:bg-transparent",
  surround: {
    root: "gap-4",
    link: "px-5 py-6 rounded-lg border-default bg-elevated/40 backdrop-blur-sm hover:bg-elevated/50",
    linkLeading: "mb-3 bg-transparent ring-default group-hover:ring-accented",
    linkLeadingIcon: "size-4 text-highlighted",
    linkTitle: "title-colors text-lg mb-0",
    linkDescription: "hidden",
  },
} as const;

definePageMeta({ layout: "blog" });

const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings("blog", route.path, {
    fields: ["title"],
  });
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
    fatal: true,
  });
}

const hasSurround = computed(() => surround.value?.some(Boolean) ?? false);

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
});
</script>

<template>
  <UContainer
    v-if="page"
    class="py-12 md:py-20"
  >
    <UButton
      to="/blog"
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="ghost"
      size="md"
      :ui="PostStyle.backLink"
      class="-ms-4 mb-4"
    >
      Back to all posts
    </UButton>

    <UPageHeader
      :title="page.title"
      :description="page.description"
      :ui="PostStyle.header"
    />

    <USeparator class="mt-8" />

    <UPage>
      <UPageBody>
        <ContentRenderer :value="page" />

        <template v-if="hasSurround">
          <USeparator class="my-12" />

          <UContentSurround
            :surround="surround"
            :ui="PostStyle.surround"
            prev-icon="i-lucide-arrow-left"
            next-icon="i-lucide-arrow-right"
          />
        </template>
      </UPageBody>

      <template #right>
        <UContentToc
          title="On this page"
          highlight
          :links="page.body?.toc?.links"
          :class="PostStyle.toc"
        />
      </template>
    </UPage>
  </UContainer>
</template>
