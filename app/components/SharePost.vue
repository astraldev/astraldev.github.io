<script setup lang="ts">
type ShareTarget = {
  label: string
  icon: string
  href: string
};

type SharePostProps = {
  title: string
  path: string
  wrapperClass?: string
  labelClass?: string
  listClass?: string
};

const SharePostStyle = {
  wrapper: "flex flex-col gap-3",
  label: "text-sm font-semibold title-colors",
  list: "flex flex-wrap items-center gap-1",
} as const;

const props = withDefaults(defineProps<SharePostProps>(), {
  wrapperClass: "",
  labelClass: "",
  listClass: "",
});

const { title, path } = toRefs(props);

const { siteUrl } = useRuntimeConfig().public;
const { copy, copied, isSupported } = useClipboard();

const shareUrl = computed(() => new URL(path.value, siteUrl).href);

const shareTargets = computed<ShareTarget[]>(() => {
  const url = encodeURIComponent(shareUrl.value);
  const text = encodeURIComponent(title.value);

  return [
    { label: "Share on X", icon: "i-simple-icons-x", href: `https://x.com/intent/tweet?text=${text}&url=${url}` },
    { label: "Share on LinkedIn", icon: "i-simple-icons-linkedin", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: "Share on Telegram", icon: "i-simple-icons-telegram", href: `https://t.me/share/url?url=${url}&text=${text}` },
    { label: "Share on WhatsApp", icon: "i-simple-icons-whatsapp", href: `https://wa.me/?text=${text}%20${url}` },
  ];
});

const copyIcon = computed(() => (copied.value ? "i-lucide-check" : "i-lucide-link"));
const copyLabel = computed(() => (copied.value ? "Link copied" : "Copy link"));

const wrapperClasses = computed(() => `${SharePostStyle.wrapper} ${props.wrapperClass}`);
const labelClasses = computed(() => `${SharePostStyle.label} ${props.labelClass}`);
const listClasses = computed(() => `${SharePostStyle.list} ${props.listClass}`);

function copyLink() {
  copy(shareUrl.value);
}
</script>

<template>
  <section :class="wrapperClasses">
    <h2 :class="labelClasses">
      Share this post
    </h2>

    <ul :class="listClasses">
      <li
        v-for="target in shareTargets"
        :key="target.label"
      >
        <UButton
          :to="target.href"
          :icon="target.icon"
          :aria-label="target.label"
          target="_blank"
          rel="noopener"
          color="neutral"
          variant="ghost"
          size="md"
        />
      </li>
      <li v-if="isSupported">
        <UButton
          :icon="copyIcon"
          :aria-label="copyLabel"
          color="neutral"
          variant="ghost"
          size="md"
          @click="copyLink"
        />
      </li>
    </ul>
  </section>
</template>
