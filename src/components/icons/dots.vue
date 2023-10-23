<template>
  <div class="dots" v-intersect="{ callback: onVisible }">
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
  </div>
</template>

<script>
import anime from "animejs";

export default {
  props: {
    colors: {
      type: String,
      default: () => "from-cst-cyan to-cst-green",
    },
  },
  methods: {
    onVisible() {
      this.$el
        .querySelectorAll("span")
        .forEach((el) => el.classList.add(...this.colors.split(" ")));
      this.dotsAnimation();
    },
    dotsAnimation() {
      anime({
        targets: this.$el.querySelectorAll("span"),
        scale: [0.5, 1, 0.5, 1],
        easing: "easeOutSine",
        // direction: "alternate",
        endDelay: 0,
        duration: 800,
        loop: true,
        delay: anime.stagger(200, { grid: [6, 6], from: 0 }),
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.dots
  @apply grid grid-cols-6 grid-rows-6

  & > span
    @apply h-2 w-2 scale-50 transform rounded-full aspect-square my-1 mx-2 bg-gradient-to-br
</style>
