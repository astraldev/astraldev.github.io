<script lang="ts" setup>
const PostStyle = {
  header: {
    root: "border-b-0 pb-0",
    title: "title-colors text-3xl sm:text-4xl",
    description: "subtitle-colors text-base sm:text-lg",
  },
  toc: "static lg:sticky mx-0 px-4 sm:mx-0 sm:px-4 lg:-mx-4 rounded-lg lg:rounded-none"
    + " border lg:border-0 border-zinc-500/20"
    + " bg-zinc-300/40 dark:bg-white/5 lg:bg-transparent lg:dark:bg-transparent",
  surround: {
    root: "gap-4",
    link: "px-5 py-6 rounded-xl border-zinc-500/20 bg-zinc-200/30 dark:bg-white/[0.03]"
      + " hover:border-primary/40 hover:bg-primary/5",
    linkLeading: "mb-3 bg-transparent ring-zinc-500/20 group-hover:ring-primary/50",
    linkLeadingIcon: "size-4 group-hover:-translate-x-0.5",
    linkTitle: "title-colors text-base mb-0 group-hover:text-primary",
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
      variant="link"
      size="sm"
      class="-ms-2 mb-4 px-2"
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
