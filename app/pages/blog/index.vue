<script setup lang="ts">
const IndexStyle = {
  header: {
    title: "title-colors",
    description: "subtitle-colors",
  },
  card: {
    root: "w-full max-w-[375px]",
    title: "title-colors",
    description: "subtitle-colors",
  },
} as const;

definePageMeta({ layout: "blog" });

const { data: posts } = await useAsyncData("blog-posts", () => {
  return queryCollection("blog")
    .select("title", "path", "description", "date", "tags")
    .order("path", "DESC")
    .all();
});

const postYears = computed(() => {
  const grouped = new Map<string, typeof posts.value>();

  for (const post of posts.value ?? []) {
    const year = post.path.split("/")[2] ?? "";
    const bucket = grouped.get(year) ?? [];

    bucket.push(post);
    grouped.set(year, bucket);
  }

  return [...grouped.entries()].map(([year, yearPosts]) => ({
    year,
    posts: yearPosts.map(post => ({
      title: post.title,
      description: post.description,
      to: post.path,
      tags: post.tags,
      ui: IndexStyle.card,
    })),
  }));
});

useSeoMeta({
  title: "Blog",
  description: "Writing on Vue, Nuxt, tooling, and whatever I am building.",
});
</script>

<template>
  <UContainer class="py-12 md:py-20">
    <UPageHeader
      headline="Blog"
      title="Notes from the workbench"
      description="Writing on Vue, Nuxt, tooling, and whatever I am building."
      :ui="IndexStyle.header"
    />

    <div
      v-if="postYears.length"
      class="mt-12 flex flex-col gap-12"
    >
      <section
        v-for="group in postYears"
        :key="group.year"
      >
        <h2 class="mb-6 text-sm font-semibold uppercase tracking-wider subtitle-colors">
          {{ group.year }}
        </h2>

        <UBlogPosts :posts="group.posts">
          <template #badge="{ post }">
            <div class="flex flex-wrap gap-1.5">
              <UBadge
                v-for="tag in post.tags"
                :key="tag"
                :label="tag"
                color="primary"
                variant="soft"
                size="sm"
              />
            </div>
          </template>
        </UBlogPosts>
      </section>
    </div>
    <p
      v-else
      class="mt-12 subtitle-colors"
    >
      Nothing published yet. Check back soon.
    </p>
  </UContainer>
</template>
