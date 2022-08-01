
export default { 
  mounted(el, binding){
    const callback = binding.value.callback || (()=>{});
    delete binding.value.callback;
    const options = {
      threshold: 0.1,
      ...binding.value.options,
    }
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          callback()
          if(binding.value.once || false){
            observer.unobserve(el)
          }
        }
      })
    }, options)
    observer.observe(el)
  }
}