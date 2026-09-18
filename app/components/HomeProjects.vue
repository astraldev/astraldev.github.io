<script setup lang="ts">
import { stagger } from "animejs";

const ProjectsItem = "home-projects-item";

const ProjectsStyle = {
  section: "min-h-[75vh] py-16",
  header: `${ProjectsItem} reveal flex flex-wrap items-end justify-between gap-4`,
  heading: "text-3xl font-bold title-colors sm:text-4xl",
  intro: "mt-3 max-w-2xl text-lg subtitle-colors",
  grid: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  card: `${ProjectsItem} reveal`,
} as const;

// The directive deletes `callback` off this object, so it cannot be readonly.
const RevealOptions = {
  callback: () => reveal.play(),
  once: true,
  options: { threshold: 0.15 },
};

const projects = useProjects(3);

const reveal = useAnimate(`.${ProjectsItem}`, {
  opacity: [0, 1],
  y: ["1.25rem", 0],
  duration: 700,
  ease: "outQuad",
  delay: stagger(120),
  autoplay: false,
});
</script>

<template>
  <section
    id="projects"
    v-intersect="RevealOptions"
    :class="ProjectsStyle.section"
  >
    <div :class="ProjectsStyle.header">
      <div>
        <h2 :class="ProjectsStyle.heading">
          Projects
        </h2>

        <p :class="ProjectsStyle.intro">
          Open source work, mostly for the web and the Linux desktop.
        </p>
      </div>

      <UButton
        to="/projects"
        icon="i-lucide-arrow-right"
        trailing
        color="neutral"
        variant="ghost"
      >
        All projects
      </UButton>
    </div>

    <div :class="ProjectsStyle.grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
        :class="ProjectsStyle.card"
      />
    </div>
  </section>
</template>
