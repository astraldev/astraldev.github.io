<template>
  <div class="bg-cyan/70 rounded-t-2xl mt-10 flex items-center justify-between flex-col">
    <div class="flex py-6 px-6 gap-y-4 items-center flex-col justify-start">
      <logo-round class="h-16 w-16"/>
      <h4 class="text-white font-comfortaa font-bold mx-auto text-3xl h-auto align-text-bottom self-end">AstralDEV</h4>
    </div>
    <span class="text-gray-200 text-sm mx-auto">2022 &copy; All rights reserved</span>
  </div>
</template>
<script>
import LogoRound from '../assets/logo-round.svg'
export default {
  components: { LogoRound }
}
</script>