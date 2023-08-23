<template>
  <button @click="toggleTheme" class="dark:text-gray-200 text-gray-500 grid place-items-center pr-2 mr-2 border-r border-gray-400">
    <svg version="1.1" viewBox="0 0 32 32" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
      <g stroke-linejoin="round">
        <circle id="sun-moon" cx="16" cy="16" fill="currentColor" r="8.5265245" mask="url(#moon-mask)" />
        <path
          id="sun-rays"
          fill="currentColor"
          d="m27.0951 4.9049042c0.337615 0.3376153 0.337615 0.8812135-1e-6 1.2188293l-2.908269 2.9082672c-0.337615 0.3376152-0.881213 0.337615-1.218828-3e-7 -0.337616-0.337616-0.337615-0.8812135 0-1.2188286l2.908269-2.9082672c0.337616-0.3376158 0.881213-0.3376164 1.218829-4e-7zm-11.0951-4.5957425c0.477461 0 0.861843 0.38438168 0.861843 0.86184234v4.1129118c0 0.4774607-0.384382 0.8618424-0.861843 0.8618424-0.47746 0-0.861842-0.3843817-0.861842-0.8618424v-4.1129118c0-0.47746066 0.384382-0.86184234 0.861842-0.86184234zm-11.095097 4.595738c0.3376158-0.3376156 0.8812136-0.3376155 1.2188291 1e-7l2.9082671 2.908268c0.3376159 0.337616 0.337616 0.881214 3e-7 1.2188296s-0.8812137 0.3376153-1.2188296-6e-7l-2.9082671-2.908268c-0.3376156-0.3376157-0.3376155-0.8812135 2e-7 -1.2188291zm-4.5957413 11.095099c0-0.477461 0.38438168-0.861842 0.86184236-0.861842h4.1129118c0.4774606 0 0.8618423 0.384381 0.8618423 0.861842s-0.3843817 0.861842-0.8618423 0.861842h-4.1129118c-0.47746068 0-0.86184236-0.384381-0.86184236-0.861842zm4.5957392 11.0951c-0.3376152-0.337616-0.3376152-0.881214 7e-7 -1.21883l2.9082673-2.908267c0.3376159-0.337616 0.8812139-0.337616 1.2188291 0 0.337616 0.337615 0.3376162 0.881213 3e-7 1.218829l-2.9082673 2.908268c-0.3376159 0.337616-0.8812141 0.337616-1.2188301 0zm11.095098 4.595741c-0.477461 0-0.861842-0.384382-0.861842-0.861843v-4.112911c0-0.477461 0.384381-0.861843 0.861842-0.861843s0.861842 0.384382 0.861842 0.861843v4.112911c0 0.477461-0.384381 0.861843-0.861842 0.861843zm11.0951-4.595742c-0.337615 0.337616-0.881213 0.337616-1.218829 0l-2.908267-2.908268c-0.337616-0.337615-0.337616-0.881213 0-1.218829 0.337615-0.337615 0.881213-0.337615 1.218829 0l2.908268 2.908268c0.337616 0.337616 0.337615 0.881213-1e-6 1.218829zm4.595741-11.095099c0 0.477461-0.384382 0.861843-0.861843 0.861843h-4.112911c-0.477461 0-0.861843-0.384382-0.861843-0.861843 0-0.47746 0.384382-0.861842 0.861843-0.861842h4.112911c0.477461 0 0.861843 0.384382 0.861843 0.861842z" />
        <mask class="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="36" cy="13" r="8.5265245" fill="black" />
        </mask>
      </g>
    </svg>
  </button>
</template>
<script>
export default {
  methods: {
    toggleTheme(){
      if(this.$root.toggleTheme())
        localStorage.theme = ''
      else
        localStorage.theme = 'dark'
    }
  }
}
</script>
<style lang="sass" scoped>
svg 
  & *
    transform-origin: center center

  #sun-rays
    animation: rotate-left-and-fade-rv ease-out 400ms 700ms
  #sun-moon
    animation: scale-and-turn-rv ease-out 400ms 300ms
  .moon circle
    @supports (cx: 1)
      animation: animate-cx-bwd 200ms 0ms ease-out forwards
  .dark &
    #sun-rays
      animation: rotate-left-and-fade ease-out 400ms 200ms forwards
    #sun-moon
      animation: scale-and-turn ease-out 400ms 400ms forwards

    .moon circle
      @supports (cx: 1)
        animation: animate-cx-fwd 400ms ease-in forwards

@keyframes rotate-left-and-fade 
  from
    opacity: 1
    transform: rotate(0deg)
  to
    opacity: 0
    transform: rotate(180deg)
@keyframes rotate-left-and-fade-rv
  from
    opacity: 0
    transform: rotate(180deg)
  to
    opacity: 1
    transform: rotate(0deg)

@keyframes scale-and-turn 
  to
    transform: scale(1.32) rotate(-20deg)

@keyframes scale-and-turn-rv
  from
    transform: scale(1.32)
  to
    transform: scale(1)

@keyframes animate-cx-fwd 
  from
    cx: 36
  to
    cx: 21
@keyframes animate-cx-bwd
  from
    cx: 21
  to
    cx: 36
</style>