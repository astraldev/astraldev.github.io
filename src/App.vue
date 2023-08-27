<template>
  <landing />
  <about-me />
  <skills />
  <contact />
  <custom-footer />
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
    if (localStorage.theme && localStorage.theme === "dark" && document.documentElement)
      document.documentElement.classList.add("dark");
  },
  methods: {
    toggleTheme() {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)"))
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
