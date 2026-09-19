<script lang="ts" setup>
const ProjectStyle = {
  header: {
    root: "border-b-0 pb-0",
    headline: "subtitle-colors",
    title: "title-colors flex items-center gap-3 text-3xl sm:text-4xl",
    description: "subtitle-colors",
  },
  icon: "size-10 shrink-0 sm:size-12",
  meta: "mt-4 flex flex-wrap gap-2",
  body: "mt-8",
} as const;

const route = useRoute();

const { data: project } = await useAsyncData(route.path, () => {
  return queryCollection("projects").path(route.path).first();
});

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project not found",
    fatal: true,
  });
}

const links = computed(() => {
  const repo = {
    "icon": "i-simple-icons-github",
    "to": project.value?.repo,
    "target": "_blank",
    "color": "neutral" as const,
    "variant": "ghost" as const,
    "square": true,
    "class": "rounded-md",
    "aria-label": "Source on GitHub",
  };

  if (!project.value?.website) {
    return [repo];
  }

  return [{
    label: "Website",
    icon: "i-lucide-arrow-up-right",
    to: project.value.website,
    target: "_blank",
  }, repo];
});

const versionLabel = computed(() => `v${project.value?.version}`);

useSeoMeta({
  title: project.value?.title,
  description: project.value?.description,
});
</script>

<template>
  <UContainer
    v-if="project"
    class="py-12 md:py-20"
  >
    <UPageHeader
      :description="project.description"
      :links="links"
      :ui="ProjectStyle.header"
    >
      <template #headline>
        <ULink to="/projects">
          Projects
        </ULink>
      </template>

      <template #title>
        <img
          v-if="project.icon"
          :src="project.icon"
          alt=""
          :class="ProjectStyle.icon"
        >
        {{ project.title }}
      </template>
    </UPageHeader>

    <div :class="ProjectStyle.meta">
      <UBadge
        v-if="project.version"
        :label="versionLabel"
        color="neutral"
        variant="subtle"
      />

      <UBadge
        v-if="project.license"
        :label="project.license"
        color="neutral"
        variant="subtle"
      />
    </div>

    <UPage :class="ProjectStyle.body">
      <UPageBody>
        <ContentRenderer :value="project" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
