import { createApp } from 'vue'
import './tailwind.sass'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faDownLong, faXmark } from '@fortawesome/free-solid-svg-icons'
/** Custom directives */
import typed from './directives/typed'
import anime from './directives/anime'
import intersect from './directives/intersect'

library.add(faBars, faXmark, faDownLong)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .directive('typed', typed)
  .directive('anime', anime)
  .directive('intersect', intersect)
  .mount('#app')
