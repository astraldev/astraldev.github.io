<script setup lang="ts">
import Logo from "../assets/astraldev-footer.svg";

type FooterLink = {
  label: string
  to: string
};

type SocialLink = FooterLink & {
  icon: string
};

const siteLinks: FooterLink[] = [
  { label: "About me", to: "/#about" },
  { label: "Works", to: "/#works" },
  { label: "Projects", to: "/#projects" },
  { label: "Skills", to: "/#skills" },
  { label: "Contact", to: "/#contact" },
];

const writingLinks: FooterLink[] = [
  { label: "All posts", to: "/blog" },
];

const socialLinks: SocialLink[] = [
  { label: "GitHub", to: "https://github.com/astraldev", icon: "i-simple-icons-github" },
  { label: "Telegram", to: "https://t.me/+2349049821801", icon: "i-simple-icons-telegram" },
  { label: "Instagram", to: "https://instagram.com/ekureedem_", icon: "i-simple-icons-instagram" },
  { label: "WhatsApp", to: "https://wa.me/2349049821801", icon: "i-simple-icons-whatsapp" },
];

const currentYear = useState(() => new Date().getFullYear());
</script>

<template>
  <footer class="border-t border-zinc-500/20 bg-zinc-200/30 dark:bg-white/[0.03]">
    <UContainer class="py-12">
      <div class="flex flex-col gap-10 md:flex-row md:justify-between">
        <div class="max-w-xs">
          <logo class="w-32 text-gray-700 dark:text-white" />
          <p class="mt-3 text-lg subtitle-colors">
            Frontend and software developer, building for the web and the Linux desktop.
          </p>
        </div>

        <div class="flex gap-12">
          <nav aria-labelledby="footer-site-heading">
            <h2
              id="footer-site-heading"
              class="text-sm font-semibold uppercase tracking-wider title-colors"
            >
              Site
            </h2>
            <ul class="mt-4 flex flex-col gap-2">
              <li
                v-for="link in siteLinks"
                :key="link.to"
              >
                <ULink
                  :to="link.to"
                  class="text-lg subtitle-colors hover:text-primary"
                >
                  {{ link.label }}
                </ULink>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-writing-heading">
            <h2
              id="footer-writing-heading"
              class="text-sm font-semibold uppercase tracking-wider title-colors"
            >
              Writing
            </h2>
            <ul class="mt-4 flex flex-col gap-2">
              <li
                v-for="link in writingLinks"
                :key="link.to"
              >
                <ULink
                  :to="link.to"
                  class="text-lg subtitle-colors hover:text-primary"
                >
                  {{ link.label }}
                </ULink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col-reverse items-center gap-4 border-t border-zinc-500/20 pt-6 sm:flex-row sm:justify-between"
      >
        <small class="text-sm subtitle-colors">
          © 2019 - {{ currentYear }} Ekure Edem. All rights reserved.
        </small>

        <ul class="flex items-center gap-1">
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
      </div>
    </UContainer>
  </footer>
</template>
