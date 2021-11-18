import { createRouter, createWebHistory } from "vue-router";

import Mobile from "../views/layout/Mobile";

const routes = [
  {
    path: "/",
    component: Mobile,
    children: [
      {
        path: "agents",
        name: "Search",
        meta:{
          title: '查找经济人'
        },
        component: () =>
          import(/* webpackChunkName: "agent_search" */ "../views/agent/Search.vue"),
      },
      {
        path: "profile/:id",
        name: "Profile",
        meta:{
          title: '经纪人简介'
        },
        component: () =>
          import(/* webpackChunkName: "agent_profile" */ "../views/agent/Profile.vue"),
      },
      {
        path: "listings",
        name: "Subscribe",
        meta:{
          title: '订阅房源'
        },
        component: () =>
          import(/* webpackChunkName: "agent_profile" */ "../views/Subscribe.vue"),
      },
    ]
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory('/m/'),
  routes,
});

export default router;
