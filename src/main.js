import { createApp } from 'vue'
import './tailwind.sass'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import typed from './directives/typed'

library.add(faBars, faXmark)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .directive('typed', typed)
  .mount('#app')
