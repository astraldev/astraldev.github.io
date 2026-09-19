<script setup lang="ts">
type Project = {
  name: string
  description: string
  link: string
  page?: string
  featured: boolean
  languages: { label: string, icon: string }[]
};

const CardStyle = {
  root: "group h-full bg-elevated/40 backdrop-blur-sm transition-colors hover:bg-elevated/60",
  title: "title-colors",
  body: "w-full",
  description: "subtitle-colors line-clamp-3",
  footer: "w-full",
} as const;

const HeaderStyle = {
  row: "flex items-center gap-2",
  badge: "shrink-0",
  arrow: "ml-auto size-4 shrink-0 subtitle-colors transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
} as const;

const props = defineProps<{ project: Project }>();

// Projects with their own page stay on the site; the rest go straight to GitHub.
const cardLink = computed(() => {
  if (props.project.page) {
    return { to: props.project.page, arrow: "i-lucide-arrow-right" };
  }

  return { to: props.project.link, target: "_blank", rel: "noopener", arrow: "i-lucide-arrow-up-right" };
});
</script>

<template>
  <UPageCard
    :to="cardLink.to"
    :target="cardLink.target"
    :rel="cardLink.rel"
    :ui="CardStyle"
  >
    <template #title>
      <span :class="HeaderStyle.row">
        {{ project.name }}

        <UBadge
          v-if="project.featured"
          label="Featured"
          color="primary"
          variant="subtle"
          size="sm"
          :class="HeaderStyle.badge"
        />

        <UIcon
          :name="cardLink.arrow"
          :class="HeaderStyle.arrow"
        />
      </span>
    </template>

    <template #description>
      {{ project.description }}
    </template>

    <template #footer>
      <ProjectMeta
        :link="project.link"
        :languages="project.languages"
      />
    </template>
  </UPageCard>
</template>
