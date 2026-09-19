<script setup lang="ts">
const MetaStyle = {
  row: "flex flex-wrap items-center gap-x-4 gap-y-2",
  stack: "flex flex-wrap items-center gap-2",
  chip: "flex items-center gap-1.5 text-xs subtitle-colors",
  chipIcon: "size-3.5",
  meta: "ml-auto flex items-center gap-3 text-xs subtitle-colors",
  metaItem: "flex items-center gap-1",
  metaIcon: "size-3.5",
} as const;

const props = defineProps<{
  link: string
  languages: { label: string, icon: string }[]
}>();

const { stats, repoPath } = useProjectStats();

const projectStats = computed(() => stats.value[repoPath(props.link)]);

const updatedLabel = computed(() => {
  const pushedAt = projectStats.value?.pushedAt;
  if (!pushedAt) return null;

  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" })
    .format(new Date(pushedAt));
});

const updatedTitle = computed(() => `Last pushed ${updatedLabel.value}`);
</script>

<template>
  <div :class="MetaStyle.row">
    <ul
      v-if="languages.length"
      :class="MetaStyle.stack"
    >
      <li
        v-for="tech in languages"
        :key="tech.icon"
        :class="MetaStyle.chip"
      >
        <UIcon
          :name="tech.icon"
          :class="MetaStyle.chipIcon"
        />
        {{ tech.label }}
      </li>
    </ul>

    <div
      v-if="projectStats"
      :class="MetaStyle.meta"
    >
      <span :class="MetaStyle.metaItem">
        <UIcon
          name="i-lucide-star"
          :class="MetaStyle.metaIcon"
        />
        {{ projectStats.stars }}
      </span>

      <span
        v-if="updatedLabel"
        :class="MetaStyle.metaItem"
        :title="updatedTitle"
      >
        <UIcon
          name="i-lucide-history"
          :class="MetaStyle.metaIcon"
        />
        {{ updatedLabel }}
      </span>
    </div>
  </div>
</template>
