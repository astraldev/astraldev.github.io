import intersect from "~/directives/intersect";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("intersect", intersect);
});
