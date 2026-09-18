<script setup lang="ts">
type Project = {
  name: string
  description: string
  link: string
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

const FooterStyle = {
  row: "flex flex-wrap items-center gap-x-4 gap-y-2",
  stack: "flex flex-wrap items-center gap-2",
  chip: "flex items-center gap-1.5 text-xs subtitle-colors",
  chipIcon: "size-3.5",
  meta: "ml-auto flex items-center gap-3 text-xs subtitle-colors",
  metaItem: "flex items-center gap-1",
  metaIcon: "size-3.5",
} as const;

const props = defineProps<{ project: Project }>();

const { stats, repoPath } = useProjectStats();

const projectStats = computed(() => stats.value[repoPath(props.project.link)]);

const updatedLabel = computed(() => {
  const pushedAt = projectStats.value?.pushedAt;
  if (!pushedAt) return null;

  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" })
    .format(new Date(pushedAt));
});
</script>

<template>
  <UPageCard
    :to="project.link"
    :ui="CardStyle"
    target="_blank"
    rel="noopener"
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
          name="i-lucide-arrow-up-right"
          :class="HeaderStyle.arrow"
        />
      </span>
    </template>

    <template #description>
      {{ project.description }}
    </template>

    <template #footer>
      <div :class="FooterStyle.row">
        <ul
          v-if="project.languages.length"
          :class="FooterStyle.stack"
        >
          <li
            v-for="tech in project.languages"
            :key="tech.icon"
            :class="FooterStyle.chip"
          >
            <UIcon
              :name="tech.icon"
              :class="FooterStyle.chipIcon"
            />
            {{ tech.label }}
          </li>
        </ul>

        <div
          v-if="projectStats"
          :class="FooterStyle.meta"
        >
          <span :class="FooterStyle.metaItem">
            <UIcon
              name="i-lucide-star"
              :class="FooterStyle.metaIcon"
            />
            {{ projectStats.stars }}
          </span>

          <span
            v-if="updatedLabel"
            :class="FooterStyle.metaItem"
            :title="`Last pushed ${updatedLabel}`"
          >
            <UIcon
              name="i-lucide-history"
              :class="FooterStyle.metaIcon"
            />
            {{ updatedLabel }}
          </span>
        </div>
      </div>
    </template>
  </UPageCard>
</template>
