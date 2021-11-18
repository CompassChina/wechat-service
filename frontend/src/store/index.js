import { createStore } from "vuex";
import { set as setCookie, get as getCookie } from "js-cookie";

const openidKey = 'M_OPENID';
export default createStore({
  state: {
    regions: [
      {name: 'Greater Boston', img: 'https://baitanstatic.luyanghui.com/compass/boston.png', num: 219},
      {name: 'Hawaii', img: 'https://baitanstatic.luyanghui.com/compass/hawaii.jpeg', num: 364},
      {name: 'Nashville', img: 'https://baitanstatic.luyanghui.com/compass/nashville.jpeg', num: 188},
      {name: 'North Florida', img: 'https://baitanstatic.luyanghui.com/compass/north_florida.jpeg', num: 542},
      {name: 'San Diego', img: 'https://baitanstatic.luyanghui.com/compass/san_diego.jpeg', num: 765},
    ],
    avatars: [
      'https://baitanstatic.luyanghui.com/compass/agent1.jpg',
      'https://baitanstatic.luyanghui.com/compass/agent2.jpeg',
      'https://baitanstatic.luyanghui.com/compass/agent3.jpg',
      'https://baitanstatic.luyanghui.com/compass/agent4.jpeg',
      'https://baitanstatic.luyanghui.com/compass/agent5.jpeg',
      'https://baitanstatic.luyanghui.com/compass/agent6.png',
      'https://baitanstatic.luyanghui.com/compass/agent7.png',
      'https://baitanstatic.luyanghui.com/compass/agent8.jpeg',
      'https://baitanstatic.luyanghui.com/compass/agent9.png',
      'https://baitanstatic.luyanghui.com/compass/agent10.jpeg',
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
