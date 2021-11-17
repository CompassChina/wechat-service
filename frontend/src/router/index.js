import { createRouter, createWebHistory } from "vue-router";

import Mobile from "../views/layout/Mobile";

const routes = [
  {
    path: "/m",
    component: Mobile,
    children: [
      {
        path: "search",
        name: "Search",
        component: () =>
          import(/* webpackChunkName: "agent_search" */ "../views/agent/Search.vue"),
      },
      {
        path: "profile/:id",
        name: "Profile",
        component: () =>
          import(/* webpackChunkName: "agent_profile" */ "../views/agent/Profile.vue"),
      },
      {
        path: "subscribe",
        name: "Subscribe",
        component: () =>
          import(/* webpackChunkName: "agent_profile" */ "../views/Subscribe.vue"),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
