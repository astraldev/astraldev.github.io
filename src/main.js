import { createApp } from 'vue'
import './tailwind.sass'
import App from './App.vue'

import Vue3SmoothScroll from 'vue3-smooth-scroll'

/** Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowUpRightFromSquare, faBars, faDownLong, faLink, faXmark } from '@fortawesome/free-solid-svg-icons'

/** Custom directives */
import typed from './directives/typed'
import anime from './directives/anime'
import intersect from './directives/intersect'

library.add(faBars, faXmark, faDownLong, faLink, faArrowUpRightFromSquare)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(Vue3SmoothScroll, {duration: 600, updateHistory: false, easing: 'easeInQuint'})
  .directive('typed', typed)
  .directive('anime', anime)
  .directive('intersect', intersect)
  .mount('#app')
