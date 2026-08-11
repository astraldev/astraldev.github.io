<script setup lang="ts">
const LatestPostsStyle = {
  section: "py-16",
  header: "flex flex-wrap items-end justify-between gap-4",
  heading: "text-3xl font-bold title-colors sm:text-4xl",
  list: "mt-10",
  card: {
    root: "w-full bg-elevated/40 backdrop-blur-sm",
    title: "title-colors",
    description: "subtitle-colors line-clamp-3",
  },
} as const;

const { data: posts } = await useAsyncData("home-latest-posts", async () => {
  const all = await queryCollection("blog")
    .select("title", "path", "description", "draft")
    .order("path", "DESC")
    .all();

  const published = import.meta.dev ? all : all.filter(post => !post.draft);

  return published.slice(0, 3);
});
</script>

<template>
  <section
    v-if="posts?.length"
    :class="LatestPostsStyle.section"
  >
    <div :class="LatestPostsStyle.header">
      <h2 :class="LatestPostsStyle.heading">
        Latest posts
      </h2>

      <UButton
        to="/blog"
        icon="i-lucide-arrow-right"
        trailing
        color="neutral"
        variant="ghost"
      >
        All posts
      </UButton>
    </div>

    <UBlogPosts :class="LatestPostsStyle.list">
      <UBlogPost
        v-for="post in posts"
        :key="post.path"
        :title="post.title"
        :description="post.description"
        :to="post.path"
        :ui="LatestPostsStyle.card"
      />
    </UBlogPosts>
  </section>
</template>
