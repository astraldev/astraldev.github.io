function load(){
  var el = document.querySelector("svg#front-end-level circle.main")
  el.style.strokeDashoffset = 440 - (440 * 60) / 100
  var el2 = document.querySelector("svg#back-end-level circle.main")
  el2.style.strokeDashoffset = 440 - (440 * 40) / 100
  var el3 = document.querySelector("svg#sd-level circle.main")
  el3.style.strokeDashoffset = 440 - (440 * 50) / 100
}

function onLink(obj) {
  children = obj.parentNode.parentElement.children; // 
  var i = 0;
  for (; i < children.length; i++) 
    children[i].children[0].id = ""
  obj.id = "active";
  nm = obj.getAttribute("href").replace("#", "")
  console.log(nm)
  section = document.querySelector(`a[name=${nm}]`)
  i = 0
  children = section.parentNode.parentNode.children;
  for (i; i < children.length; i++) 
    children[i].classList.add("hidden")
  var cls_list = section.parentNode.classList
  if (cls_list.contains("hidden")) cls_list.remove("hidden")
  section.parentNode.classList = cls_list
  var main_menu = document.getElementById("sm-menu-list");
  main_menu.classList.add("hidden")
  console.log(main_menu)
}
function toggleMenu() {
  var m_list = document.getElementById("sm-menu-list");
  var cs = m_list.classList;
  if (cs.contains("hidden")) cs.remove("hidden");
  else cs.add("hidden");
}
load()