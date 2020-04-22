import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import RegisterationSuccess from "../views/RegisterComplete.vue";
import fb from "../firebaseConfigFiles/firebaseInit";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      authCompleted: true,
    },
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      authCompleted: true,
    },
  },
  {
    path: "/registeration-success",
    name: "RegisterationSuccess",
    component: RegisterationSuccess,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;
  if (requiresAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const authCompleted = to.matched.some((record) => record.meta.authCompleted);
  const currentUser = fb.auth().currentUser;
  if (authCompleted && currentUser) {
    next("/");
  } else {
    next();
  }
});

export default router;
