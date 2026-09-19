<script setup lang="ts">
type Project = {
  name: string
  description: string
  link: string
  page?: string
  languages: { label: string, icon: string }[]
};

type ProjectDetails = {
  icon?: string
  version?: string
  license?: string
};

const CardStyle = {
  root: "group bg-elevated/40 backdrop-blur-sm transition-colors hover:bg-elevated/60",
  body: "w-full",
  title: "title-colors w-full text-xl",
  description: "subtitle-colors w-full",
  footer: "w-full",
} as const;

const HeaderStyle = {
  row: "flex items-center gap-3",
  icon: "size-9 shrink-0",
  arrow: "ml-auto size-4 shrink-0 subtitle-colors transition-transform group-hover:translate-x-0.5",
} as const;

const BodyStyle = {
  badges: "mt-4 flex flex-wrap gap-2",
} as const;

const props = defineProps<{
  project: Project
  details?: ProjectDetails
}>();

const versionLabel = computed(() => `v${props.details?.version}`);
</script>

<template>
  <UPageCard
    :to="project.page"
    :ui="CardStyle"
  >
    <template #title>
      <span :class="HeaderStyle.row">
        <img
          v-if="details?.icon"
          :src="details.icon"
          alt=""
          :class="HeaderStyle.icon"
        >
        {{ project.name }}

        <UIcon
          name="i-lucide-arrow-right"
          :class="HeaderStyle.arrow"
        />
      </span>
    </template>

    <template #description>
      {{ project.description }}

      <span :class="BodyStyle.badges">
        <UBadge
          v-if="details?.version"
          :label="versionLabel"
          color="neutral"
          variant="subtle"
        />

        <UBadge
          v-if="details?.license"
          :label="details.license"
          color="neutral"
          variant="subtle"
        />
      </span>
    </template>

    <template #footer>
      <ProjectMeta
        :link="project.link"
        :languages="project.languages"
      />
    </template>
  </UPageCard>
</template>
