<script setup lang="ts">
const ProjectsStyle = {
  header: {
    root: "border-b-0",
    title: "title-colors",
    description: "subtitle-colors",
  },
  grid: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  more: "mt-12 flex justify-center",
} as const;

const projects = useProjects();

useSeoMeta({
  title: "Projects",
  description: "Open source work by astraldev, mostly for the web and the Linux desktop.",
});
</script>

<template>
  <UContainer class="py-12 md:py-20">
    <UPageHeader
      headline="Projects"
      title="Things I have built"
      description="Open source work, mostly for the web and the Linux desktop."
      :ui="ProjectsStyle.header"
    />

    <div :class="ProjectsStyle.grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>

    <div :class="ProjectsStyle.more">
      <UButton
        to="https://github.com/astraldev?tab=repositories"
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        size="lg"
        target="_blank"
        rel="noopener"
      >
        See more on GitHub
      </UButton>
    </div>
  </UContainer>
</template>
