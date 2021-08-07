function load(){
  var el = document.querySelector("svg#front-end-level circle.main")
  el.style.strokeDashoffset = 440 - (440 * 60) / 100
  var el2 = document.querySelector("svg#back-end-level circle.main")
  el2.style.strokeDashoffset = 440 - (440 * 40) / 100
  var el3 = document.querySelector("svg#sd-level circle.main")
  el3.style.strokeDashoffset = 440 - (440 * 50) / 100
}

function onLink(obj) {
  children = document.querySelector("#menu-list").children; // 
  nm = obj.getAttribute("href").replace("#", "")
  var i = 0;
  for (; i < children.length; i++) {
    var attr = children[i].children[0]
    try{
      attr = attr.getAttribute("href").replace("#", "")
      if(nm == attr){
        children[i].children[0].id = "active"
        continue  
      }
    }catch(e){}
    children[i].children[0].id = ""
  }
  obj.id = "active";
  console.log(nm)
  section = document.querySelector(`a[name=${nm}]`)
  children = section.parentNode.parentNode.children;
  i = 0
  for (i; i < children.length; i++) 
  children[i].classList.add("hidden")
  var cls_list = section.parentNode.classList
  if (cls_list.contains("hidden")) cls_list.remove("hidden")
  section.parentNode.classList = cls_list
  window.scrollTo(0,0);

}
function onLink_sm(obj){
  children = document.querySelector("#sm-menu-list").children; // 
  nm = obj.getAttribute("href").replace("#", "")
  var i = 0;
  for (; i < children.length; i++) {
    var attr = children[i].children[0]
    try{
      attr = attr.getAttribute("href").replace("#", "")
      if(nm == attr){
        children[i].children[0].id = "active"
        continue  
      }
    }catch(e){}

    children[i].children[0].id = ""
  }
  obj.id = "active";
  section = document.querySelector(`a[name=${nm}]`)
  children = section.parentNode.parentNode.children;
  i = 0
  for (; i < children.length; i++) 
    children[i].classList.add("hidden")
  var cls_list = section.parentNode.classList
  if (cls_list.contains("hidden")) cls_list.remove("hidden")

  section.parentNode.classList = cls_list
  document.getElementById("sm-menu").classList.add("hidden")
  window.scrollTo(0,0);
}
function toggleMenu() {
  var m_list = document.getElementById("sm-menu");
  var cs = m_list.classList;
  if (cs.contains("hidden")){
    cs.remove("hidden");
    cs.add("slide-from-right")
  }
  else{
    cs.remove("slide-from-right")
    cs.add("slide-to-right")
    setTimeout(function() {
      cs.remove("slide-to-right")
      cs.add("hidden")
    }, 650);
  }
}
load()