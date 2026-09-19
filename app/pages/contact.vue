<script setup lang="ts">
import { email, socials } from "~/data/data.json";

const ContactStyle = {
  header: {
    root: "border-b-0",
    title: "title-colors",
    description: "subtitle-colors",
  },
  email: "mt-6 flex flex-wrap items-center gap-2",
  socials: "mt-10 flex flex-wrap items-center gap-6",
  social: "flex subtitle-colors transition-colors hover:text-primary",
  socialIcon: "size-7",
} as const;

const mailto = `mailto:${email}`;

const { copy, copied, isSupported } = useClipboard();

const copyIcon = computed(() => (copied.value ? "i-lucide-check" : "i-lucide-copy"));
const copyLabel = computed(() => (copied.value ? "Email copied" : "Copy email address"));

function copyEmail() {
  copy(email);
}

useSeoMeta({
  title: "Contact",
  description: "Get in touch with astraldev about a project, a bug, or just to say hi.",
});
</script>

<template>
  <UContainer class="py-12 md:py-20">
    <UPageHeader
      headline="Contact"
      title="Say hi"
      description="Got a project in mind, found a bug in one of my repos, or just want to talk? Email is the best way to reach me."
      :ui="ContactStyle.header"
    />

    <div :class="ContactStyle.email">
      <UButton
        :to="mailto"
        icon="i-lucide-mail"
        size="xl"
        class="text-white"
      >
        {{ email }}
      </UButton>

      <UButton
        v-if="isSupported"
        :icon="copyIcon"
        :aria-label="copyLabel"
        color="neutral"
        variant="ghost"
        size="xl"
        @click="copyEmail"
      />
    </div>

    <ul :class="ContactStyle.socials">
      <li
        v-for="social in socials"
        :key="social.to"
      >
        <ULink
          :to="social.to"
          target="_blank"
          rel="noopener"
          :aria-label="social.label"
          :class="ContactStyle.social"
        >
          <UIcon
            :name="social.icon"
            :class="ContactStyle.socialIcon"
          />
        </ULink>
      </li>
    </ul>
  </UContainer>
</template>
