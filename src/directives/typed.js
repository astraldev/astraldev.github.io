import Typed from "typed.js";

export default {
  mounted(el, binding) {
    var text = el.innerHtml;
    var strings = binding.value
      ? [...(binding.value.strings || text)]
      : [text || ""];
    el.innerText = "";
    new Typed(el, {
      ...(binding.value || {}),
      strings: strings,
    });
  },
};
