<script setup lang="ts">
type FollowItProps = {
  wrapperClass?: string
  labelClass?: string
  descriptionClass?: string
};

const FollowItStyle = {
  wrapper: "flex flex-col gap-3",
  label: "text-sm font-semibold title-colors",
  description: "text-sm subtitle-colors",
} as const;

const props = withDefaults(defineProps<FollowItProps>(), {
  wrapperClass: "",
  labelClass: "",
  descriptionClass: "",
});

const { followItUrl } = useRuntimeConfig().public;

const wrapperClasses = computed(() => `${FollowItStyle.wrapper} ${props.wrapperClass}`);
const labelClasses = computed(() => `${FollowItStyle.label} ${props.labelClass}`);
const descriptionClasses = computed(() => `${FollowItStyle.description} ${props.descriptionClass}`);
</script>

<template>
  <section
    v-if="followItUrl"
    :class="wrapperClasses"
  >
    <h2 :class="labelClasses">
      Get new posts
    </h2>

    <p :class="descriptionClasses">
      New posts land in your inbox, no account needed.
    </p>

    <UButton
      :to="followItUrl"
      icon="i-lucide-mail"
      target="_blank"
      rel="noopener"
      color="primary"
      variant="soft"
      size="md"
      block
    >
      Follow via follow.it
    </UButton>
  </section>
</template>
