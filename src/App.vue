<template>
  <landing />
  <navbar />
  <about-me />
  <skills />
  <contact />
  <custom-footer />
  <div id="custom-cursor">
    <span class="internal"></span>
    <span class="external"></span>
  </div>
</template>
<script>
import navbar from "./components/navbar.vue";
import landing from "./components/landing.vue";
import skills from "./components/skills.vue";
import AboutMe from "./components/AboutMe.vue";
import contact from "./components/contact.vue";
import CustomFooter from "./components/custom-footer.vue";
export default {
  components: { navbar, landing, AboutMe, skills, contact, CustomFooter },
  mounted() {
    if (localStorage.theme && localStorage.theme === "dark")
      document.documentElement.classList.add("dark");

    const cursors = [
      document.querySelector("div#custom-cursor .internal"),
      document.querySelector("div#custom-cursor .external"),
    ];

    function animate() {
      let cursorsX = [0, 0];
      let cursorsY = [0, 0];
      let mouseX = 0;
      let mouseY = 0;

      const speeds = [0.3, 0.2];

      function handler() {
        let dx = [
          mouseX - cursorsX[0],
          mouseX - cursorsX[1] - cursors[1].clientWidth / 2,
        ];
        let dy = [
          mouseY - cursorsY[0],
          mouseY - cursorsY[1] - cursors[1].clientHeight / 2,
        ];

        cursorsX = [cursorsX[0] + dx[0] * speeds[0], cursorsX[1] + dx[1] * speeds[1]];

        cursorsY = [cursorsY[0] + dy[0] * speeds[0], cursorsY[1] + dy[1] * speeds[1]];

        cursors[0].style.left = `${cursorsX[0]}px`;
        cursors[1].style.left = `${cursorsX[1]}px`;

        cursors[0].style.top = `${cursorsY[0]}px`;
        cursors[1].style.top = `${cursorsY[1]}px`;

        requestAnimationFrame(handler);
      }

      handler();
      document.addEventListener("mousemove", (ev) => {
        mouseX = ev.pageX;
        mouseY = ev.pageY;

        const cursor_container = document.querySelector("#custom-cursor");
        if (!cursor_container.classList.contains("active")) {
          cursor_container.classList.add("active");
        }

        const el_type = document.elementFromPoint(ev.clientX, ev.clientY);
        if (el_type.tagName == "A") cursors[0].classList.add("over-link");
        else {
          cursors[0].classList.remove("over-link");
        }
      });
    }

    animate();
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
<style lang="sass" scoped>
#custom-cursor.active
  .internal
    &.over-text, &.over-link
      &+.external
        @apply animate-none p-6
      @apply h-4 w-0.5
    &.over-link
      &::before
        content: ''
        border-bottom: 8px solid
        border-right: 4px solid transparent
        border-left: 4px solid transparent
        @apply absolute -translate-x-1/3 -top-1/3 w-0 h-0 border-b-cyan dark:border-b-green
      @apply h-4 w-0.5 rotate-[30deg]


    @apply rounded-full absolute dark:bg-green bg-cyan h-2 w-2 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 aspect-square flex
  .external
    @apply absolute dark:border-cyan border-green p-4 z-50 pointer-events-none border animate-ping rounded-full h-5 w-5
</style>
