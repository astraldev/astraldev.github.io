
export default { 
  mounted(el, binding){
    const callback = binding.value.callback || (()=>{});
    delete binding.value.callback;
    const options = {
      threshold: 0.5,
      ...binding.value.options,
    }
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting) callback()
      })
    }, options)
    observer.observe(el)
  }
}