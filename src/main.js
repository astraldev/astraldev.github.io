import { createApp } from 'vue'
import './tailwind.sass'
import App from './App.vue'

import Vue3SmoothScroll from 'vue3-smooth-scroll'

/** Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChrome, faTelegram, faGithub, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faAt,
  faBars,
  faCaretDown,
  faCaretUp,
  faDownLong,
  faLink,
  faPaperPlane,
  faServer,
  faWindowRestore,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

/** Custom directives */
import typed from './directives/typed'
import anime from './directives/anime'
import intersect from './directives/intersect'

library.add(faBars, faCaretDown, faAt, faPaperPlane, faWhatsapp, faGithub, faInstagram, faCaretUp, faXmark, faChrome, faDownLong, faLink, faArrowUpRightFromSquare, faTelegram, faWindowRestore, faServer)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(Vue3SmoothScroll, {
    duration: 600,
    updateHistory: false,
    easing: 'easeInQuart'
  })
  .directive('typed', typed)
  .directive('anime', anime)
  .directive('intersect', intersect)
  .mount('#app')