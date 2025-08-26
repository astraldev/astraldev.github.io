import type { DirectiveBinding } from "vue";

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const callback = binding.value.callback || (() => { });
    delete binding.value.callback;
    const options = {
      threshold: 0.2,
      ...binding.value.options,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(el);
          if (binding.value.once === true) {
            observer.unobserve(el);
          }
        }
      });
    }, options);
    observer.observe(el);
  },
};
