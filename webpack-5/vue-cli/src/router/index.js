import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/home");

const About = () => import("../views/about");

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
