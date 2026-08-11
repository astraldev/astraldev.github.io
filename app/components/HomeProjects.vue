<script setup lang="ts">
import { projects } from "~/data/data.json";

const ProjectsStyle = {
  section: "py-16",
  heading: "text-3xl font-bold title-colors sm:text-4xl",
  intro: "mt-3 max-w-2xl text-lg subtitle-colors",
  grid: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  stack: "flex flex-wrap items-center gap-2",
  stackIcon: "size-4 subtitle-colors",
  card: {
    root: "bg-elevated/40 backdrop-blur-sm"
      + " [--spotlight-color:color-mix(in_oklab,var(--ui-primary)_18%,transparent)]",
    title: "title-colors",
    description: "subtitle-colors line-clamp-3",
  },
} as const;

const projectCards = computed(() => {
  return [...projects].sort((first, second) => Number(second.featured) - Number(first.featured));
});
</script>

<template>
  <section
    id="projects"
    :class="ProjectsStyle.section"
  >
    <h2 :class="ProjectsStyle.heading">
      Projects
    </h2>

    <p :class="ProjectsStyle.intro">
      Open source work, mostly for the web and the Linux desktop.
    </p>

    <div :class="ProjectsStyle.grid">
      <UPageCard
        v-for="project in projectCards"
        :key="project.name"
        :title="project.name"
        :description="project.description"
        :to="project.link"
        :ui="ProjectsStyle.card"
        target="_blank"
        rel="noopener"
        spotlight
      >
        <template
          v-if="project.languages.length"
          #footer
        >
          <ul :class="ProjectsStyle.stack">
            <li
              v-for="tech in project.languages"
              :key="tech.icon"
            >
              <UIcon
                :name="tech.icon"
                :aria-label="tech.label"
                :class="ProjectsStyle.stackIcon"
              />
            </li>
          </ul>
        </template>
      </UPageCard>
    </div>
  </section>
</template>
