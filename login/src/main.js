import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "axios";
import fb from "./firebaseConfigFiles/firebaseInit";
Vue.prototype.$axios = axios; //use axios throughout Vue

Vue.config.productionTip = false;

let app;

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
