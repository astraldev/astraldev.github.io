<template>
  <div class="background -z-20 fixed inset-0 pointer-events-none">
    <span class="blur-2xl"></span>
    <span class="blur-2xl"></span>
    <span class="blur-2xl"></span>
  </div>
  <div class="-z-10 fixed inset-0 pointer-events-none backdrop-blur-lg"></div>
  <div
    class="fixed inset-x-1.5 md:inset-x-8 lg:inset-x-16 inset-y-0 pointer-events-none border-x glass-border"
  ></div>
  <dots
    class="fixed -z-20 left-[4.5%] w-[15vh] h-[15vh] md:w-[15vw] md:h-[15vw]"
    colors="from-white to-cst-green dark:from-gray-900 dark:to-cst-cyan"
  />
  <landing />
  <about-me />
  <timeline class="md:hidden" />
  <projects class="md:hidden" />
  <skills />
  <div class="hidden md:flex items-center justify-center" id="works">
    <timeline ref="tl" no-id />
    <projects ref="pr" no-id />
  </div>
  <contact />
  <custom-footer />
</template>
<script>
import landing from "./components/landing.vue";
import skills from "./components/skills.vue";
import timeline from "./components/timeline.vue";
import projects from "./components/projects.vue";
import AboutMe from "./components/about-me.vue";
import contact from "./components/contact.vue";
import CustomFooter from "./components/custom-footer.vue";
import dots from "./components/icons/dots.vue";

export default {
  data() {
    return {
      afterThemeChange: () => {},
    };
  },
  components: {
    landing,
    AboutMe,
    skills,
    contact,
    CustomFooter,
    projects,
    dots,
    timeline,
  },
  mounted() {
    if (localStorage.theme && localStorage.theme === "dark" && document.documentElement)
      document.documentElement.classList.add("dark");
    window.addEventListener("resize", this.autoResizeTimeline);
    this.autoResizeTimeline();
    this.afterThemeChange();
  },
  methods: {
    toggleTheme() {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)"))
      ) {
        localStorage.theme = "";
        this.afterThemeChange();
        document.documentElement.classList.remove("dark");
        return true;
      } else {
        localStorage.theme = "dark";
        this.afterThemeChange();
        document.documentElement.classList.add("dark");
        return false;
      }
    },
    autoResizeTimeline() {
      const pr = this.$refs["pr"];
      const tl = this.$refs["tl"];

      if (pr && tl) {
        tl.$el.style.height = `${pr.$el.clientHeight}px`;
      }
    },
    getTheme() {
      if (localStorage.theme === "dark") return "dark";
      return "light";
    },
  },
};
</script>
