<script setup lang="ts">
const { data: posts } = await useAsyncData("documents-list", () => {
  return queryCollection("blog")
    .select("title", "path", "description")
    .all();
});
</script>

<template>
  <div>
    <section>
      <div>
        <span>
          Hi there
        </span>
        <span>
          I'm astraldev
        </span>
      <!-- Animate through texts, like my works, what I do, what I like doing -->
      </div>
      <div>
        <UButton>
          <!-- Download button icon -->
          <UIcon name="" />
          Resume
        </UButton>

        <UButton>
          <!-- Article icon -->
          <UIcon name="" />
          Blog
        </UButton>
      </div>
    </section>
    <section>
      <h2>Projects</h2>
      <p>I love creating and working on open source projects, like the ones listed below</p>
      <div>
        <!-- <UPageCard></UPageCard> -->
      </div>
    </section>
    <section>
      <h2>Blog posts</h2>
      <div>
        <!-- <UPageCard></UPageCard> -->
      </div>
    </section>
  </div>
</template>
