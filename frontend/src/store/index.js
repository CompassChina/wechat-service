import { createStore } from "vuex";
import { set as setCookie, get as getCookie } from "js-cookie";

const openidKey = 'M_OPENID';
export default createStore({
  state: {
    regions: [
      {name: 'Greater Boston', img: '/images/boston.png', num: 219},
      {name: 'Hawaii', img: '/images/hawaii.jpeg', num: 364},
      {name: 'Nashville', img: '/images/nashville.jpeg', num: 188},
      {name: 'North Florida', img: '/images/north_florida.jpeg', num: 542},
      {name: 'San Diego', img: '/images/san_diego.jpeg', num: 765},
    ],
    avatars: [
      '/images/agent1.jpg',
      '/images/agent2.jpeg',
      '/images/agent3.jpg',
      '/images/agent4.jpeg',
      '/images/agent5.jpeg',
      '/images/agent6.png',
      '/images/agent7.png',
      '/images/agent8.jpeg',
      '/images/agent9.png',
      '/images/agent10.jpeg',
    ],
    openid: getCookie(openidKey)
  },
  mutations: {
    COMMIT_REGIONS(state, value){
      state.regions = value;
    },
    COMMIT_OPENID(state, openid){
      state.openid = openid;
      setCookie(openidKey, openid, { expires: 1 })
    }
  },
  actions: {},
  modules: {},
});
