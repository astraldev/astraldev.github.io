import Typed from 'typed.js'

export default {
  mounted(el, binding){
    var text = el.innerHtml;
    var strings = binding.value ? [...binding.value.strings || text] : [text || '']
    el.innerText = ""
    new Typed(el, {
      strings: strings ,
      typeSpeed: binding.value ? binding.value.speed || 40 : 40
    })
  }
}