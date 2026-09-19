<script setup lang="ts">
import { animate, stagger } from "animejs";
import Logo from "../assets/astraldev.svg";
import { socials as socialLinks } from "~/data/data.json";

type NavLink = {
  label: string
  to: string
};

const HeaderStyle = {
  root: "py-3",
  bar: "grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2",
  left: "col-start-1 flex items-center justify-self-start",
  logo: "w-24 text-gray-700 dark:text-white",
  back: {
    base: "gap-1.5 px-0 text-sm font-medium subtitle-colors hover:text-primary",
    leadingIcon: "size-4",
  },
  inlineLinks: "col-start-2 hidden items-center gap-6 justify-self-center sm:flex",
  inlineLink: "text-sm font-medium subtitle-colors hover:text-primary",
  right: "col-start-3 flex items-center justify-self-end",
  toggle: "sm:hidden",
  menu: {
    overlay: "backdrop-blur-xl",
    content: "bg-white/80 ring-0 shadow-none divide-y-0 dark:bg-canvas/80",
    header: "px-6 py-4 sm:px-6",
    title: "sr-only",
    description: "sr-only",
    body: "flex flex-col justify-center gap-10 px-6 pb-16 sm:px-6",
  },
  menuLink: "menu-item block w-fit text-3xl font-semibold title-colors hover:text-primary sm:text-4xl",
  socials: "menu-item flex items-center gap-1",
} as const;

const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Blog", to: "/blog" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const route = useRoute();

// A post swaps the logo for the way back to the index. Everywhere else keeps the
// logo, since the nav links already cover those destinations.
const back = computed(() => {
  if (route.path.startsWith("/blog/")) {
    return { to: "/blog", label: "All posts" };
  }

  return undefined;
});

const open = ref(false);

async function animateMenu() {
  await nextTick();

  animate(".menu-item", {
    opacity: [0, 1],
    y: ["1.5rem", 0],
    duration: 500,
    ease: "outQuad",
    delay: stagger(70),
  });
}

watch(open, (isOpen) => {
  if (isOpen) {
    animateMenu();
  }
});
</script>

<template>
  <header :class="HeaderStyle.root">
    <UContainer>
      <nav :class="HeaderStyle.bar">
        <div :class="HeaderStyle.left">
          <UButton
            v-if="back"
            :to="back.to"
            icon="i-lucide-arrow-left"
            color="neutral"
            variant="link"
            size="md"
            :ui="HeaderStyle.back"
          >
            {{ back.label }}
          </UButton>

          <ULink
            v-else
            to="/"
            aria-label="astraldev home"
            class="flex items-center"
          >
            <logo :class="HeaderStyle.logo" />
          </ULink>
        </div>

        <div :class="HeaderStyle.inlineLinks">
          <ULink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            active-class="text-primary"
            :class="HeaderStyle.inlineLink"
          >
            {{ link.label }}
          </ULink>
        </div>

        <div :class="HeaderStyle.right">
          <UColorModeButton size="sm" />

          <UButton
            icon="i-lucide-menu"
            aria-label="Open menu"
            color="neutral"
            variant="ghost"
            size="sm"
            :class="HeaderStyle.toggle"
            @click="open = true"
          />
        </div>
      </nav>
    </UContainer>

    <UModal
      v-model:open="open"
      title="Menu"
      description="Site navigation"
      fullscreen
      :transition="false"
      :ui="HeaderStyle.menu"
    >
      <template #body>
        <ul class="flex flex-col gap-5">
          <li
            v-for="link in navLinks"
            :key="link.to"
          >
            <ULink
              :to="link.to"
              active-class="text-primary"
              :class="HeaderStyle.menuLink"
              @click="open = false"
            >
              {{ link.label }}
            </ULink>
          </li>
        </ul>

        <ul :class="HeaderStyle.socials">
          <li
            v-for="social in socialLinks"
            :key="social.to"
          >
            <UButton
              :to="social.to"
              :icon="social.icon"
              :aria-label="social.label"
              target="_blank"
              rel="noopener"
              color="neutral"
              variant="ghost"
              size="sm"
            />
          </li>
        </ul>
      </template>
    </UModal>
  </header>
</template>
