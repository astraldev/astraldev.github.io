import { createApp } from "vue";
import "./tailwind.sass";
import App from "./App.vue";

import Vue3SmoothScroll from "vue3-smooth-scroll";

/** Font Awesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChrome,
  faTelegram,
  faGithub,
  faInstagram,
  faWhatsapp,
  faPython,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
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
  faCloudArrowDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

/** Custom directives */
import typed from "./directives/typed";
import anime from "./directives/anime";
import intersect from "./directives/intersect";

// Event handling
// import mitt from "mitt";

// const emitter = mitt();

library.add(
  faCalendar,
  faCloudArrowDown,
  faPython,
  faBars,
  faCaretDown,
  faAt,
  faPaperPlane,
  faWhatsapp,
  faGithub,
  faInstagram,
  faCaretUp,
  faXmark,
  faChrome,
  faDownLong,
  faLink,
  faArrowUpRightFromSquare,
  faTelegram,
  faWindowRestore,
  faServer,
  faVuejs,
);

const app = createApp(App);

app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(Vue3SmoothScroll, {
  duration: 600,
  updateHistory: false,
  offset: -250,
  easing: "easeInQuart",
});
app.directive("typed", typed);
app.directive("anime", anime);
app.directive("intersect", intersect);
app.mount("#app");
// app.config.globalProperties.$bus = emitter;
