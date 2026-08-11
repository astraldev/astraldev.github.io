<script setup lang="ts">
const IndexStyle = {
  header: {
    root: "border-b-0",
    title: "title-colors",
    description: "subtitle-colors",
  },
  card: {
    root: "w-full max-w-[375px] bg-elevated/40 backdrop-blur-sm",
    title: "title-colors",
    description: "subtitle-colors line-clamp-4",
  },
} as const;

const { data: posts } = await useAsyncData("blog-posts", async () => {
  const all = await queryCollection("blog")
    .select("title", "path", "description", "date", "tags", "draft")
    .order("path", "DESC")
    .all();

  if (import.meta.dev) {
    return all;
  }

  return all.filter(post => !post.draft);
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
    posts: (yearPosts || []).map(post => ({
      title: post.title,
      description: post.description,
      to: post.path,
      tags: post.tags,
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

        <UBlogPosts>
          <UBlogPost
            v-for="post in group.posts"
            :key="post.to"
            :title="post.title"
            :description="post.description"
            :to="post.to"
            :ui="IndexStyle.card"
          >
            <template #badge>
              <div class="flex flex-wrap gap-1.5">
                <UBadge
                  v-for="tag in post.tags"
                  :key="tag"
                  :label="tag"
                  color="primary"
                  variant="soft"
                  size="lg"
                />
              </div>
            </template>
          </UBlogPost>
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
