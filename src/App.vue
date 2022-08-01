<template>
  <landing />
  <about-me />
</template>
<script>
import navbar from './components/navbar.vue'
import landing from './components/landing.vue'
import AboutMe from './components/AboutMe.vue'
export default {
  components: { navbar, landing, AboutMe }
}
</script>
<style>
</style>