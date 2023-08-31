<template>
  <div
    class="background -z-20 fixed inset-0 pointer-events-none"
  >
    <span class="blur-2xl"></span>
  </div>
  <div class="-z-10 fixed inset-0 pointer-events-none backdrop-blur-lg"></div>
  <div
    class="fixed inset-x-1.5 md:inset-x-8 lg:inset-x-16 inset-y-0 pointer-events-none border-x border-zinc-500/10"
  ></div>
  <div class="snap-y snap-mandatory">
    <landing />
    <about-me />
    <skills />
    <contact />
    <custom-footer />
  </div>
</template>
<script>
import landing from "./components/landing.vue";
import skills from "./components/skills.vue";
import AboutMe from "./components/AboutMe.vue";
import contact from "./components/contact.vue";
import CustomFooter from "./components/custom-footer.vue";

export default {
  components: { landing, AboutMe, skills, contact, CustomFooter },
  mounted() {
    if (
      localStorage.theme &&
      localStorage.theme === "dark" &&
      document.documentElement
    )
      document.documentElement.classList.add("dark");
  },
  methods: {
    toggleTheme() {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)"))
      ) {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "";
        return true;
      } else {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
        return false;
      }
    },
  },
};
</script>
