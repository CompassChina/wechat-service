import { createRouter, createWebHistory } from "vue-router";

import Mobile from "../views/layout/Mobile";
import Search from "../views/agent/Search.vue";
import Profile from "../views/agent/Profile.vue";
import Subscribe from "../views/Subscribe.vue";
const routes = [
  {
    path: "/",
    component: Mobile,
    children: [
      {
        path: "agents",
        name: "Search",
        meta:{
          title: '查找经纪人',
        },
        component: Search,
      },
      {
        path: "profile/:id",
        name: "Profile",
        meta:{
          title: '经纪人简介'
        },
        component: Profile,
      },
      {
        path: "listings",
        name: "Subscribe",
        meta:{
          title: '订阅房源'
        },
        component: Subscribe,
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
