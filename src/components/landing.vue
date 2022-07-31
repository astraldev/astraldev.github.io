
<template>
  <div class="md:hidden flex flex-col h-screen w-full items-center justify-center">
    <round-logo class="aspect-square h-1/4 -mt-24" />
    <h2 class="text-4xl font-comfortaa font-bold mt-8 text-gray-600 text-center">Web & Software Developer</h2>
    <span class="inline text-sm text-center mx-4 p-2">
      <span class="text-gray-500 font-ubuntu-mono inline" v-typed="typedOptions">
      </span>
    </span>
  </div>
</template>
<script>
import RoundLogo from '../assets/logo-round.svg'
export default {
  components: { RoundLogo },
  data(){
    return {
      typedOptions: {
        strings: [
          "I love to create and design intuitive <b>websites</b>^1000 and ^1000<i>linux desktop</i> <b>applications</b>.",
          "Freelancer and <b>UI/UX designer</b>."
        ]
      }
    }
  }
}
</script>