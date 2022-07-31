import anime from "animejs";

export default {
  mounted(el, binding){
    anime({
      targets: binding.value ? binding.value.elements || el : el,
      ...binding.value || {} 
    })
  }
}