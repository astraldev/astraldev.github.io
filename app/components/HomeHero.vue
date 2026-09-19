<script setup lang="ts">
import { stagger } from "animejs";
import { thingsIDo } from "~/data/data.json";

const HeroItem = "home-hero-item";

const HeroStyle = {
  section: "relative flex min-h-[calc(100dvh-6rem)] flex-col justify-center py-16",
  grid: "grid gap-12 lg:grid-cols-2 lg:items-center",
  eyebrow: `${HeroItem} reveal font-semibold text-primary`,
  title: `${HeroItem} reveal mt-3 text-5xl font-bold text-pretty title-colors sm:text-6xl lg:text-7xl`,
  caption: `${HeroItem} reveal mt-6 min-h-14 font-mono text-lg subtitle-colors`,
  actions: `${HeroItem} reveal mt-10 flex flex-wrap items-center gap-3`,
  cta: {
    trailingIcon: "size-4 opacity-60",
    base: "py-2.5 px-4",
  },
} as const;

const typedRef = useTemplateRef("typed");

useTyped(typedRef, {
  strings: thingsIDo,
  initialDelay: 900,
  loop: true,
  autoPlay: true,
});

useAnimate(`.${HeroItem}`, {
  opacity: [0, 1],
  y: ["1.25rem", 0],
  duration: 700,
  ease: "outQuad",
  delay: stagger(120),
});
</script>

<template>
  <section :class="HeroStyle.section">
    <div :class="HeroStyle.grid">
      <div>
        <p :class="HeroStyle.eyebrow">
          Hi there
        </p>

        <h1 :class="HeroStyle.title">
          I'm astraldev
        </h1>

        <p :class="HeroStyle.caption">
          <span class="sr-only">{{ thingsIDo.join(". ") }}</span>
          <span
            v-once
            ref="typed"
            aria-hidden="true"
          />
        </p>

        <div :class="HeroStyle.actions">
          <UButton
            to="/blog"
            icon="i-lucide-book-open"
            color="primary"
            variant="solid"
            size="xl"
            :ui="HeroStyle.cta"
          >
            Bloggg
          </UButton>

          <UButton
            to="/projects"
            icon="i-lucide-arrow-right"
            trailing
            color="neutral"
            variant="ghost"
            size="xl"
            :ui="HeroStyle.cta"
          >
            What have I built?
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
