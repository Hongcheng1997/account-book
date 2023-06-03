import { createApp } from "vue";
import { Button, Form, Field, CellGroup, NavBar } from "vant";
import * as VueRouter from "vue-router";
import App from "./App.vue";
import Home from "./components/home.vue";
import AccountList from "./components/account-list.vue";
import Login from "./components/login.vue";
import Dates from "./components/dates.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/account-list", component: AccountList },
  { path: "/login", component: Login },
  { path: "/dates", component: Dates },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(NavBar)
  .mount("#app");
