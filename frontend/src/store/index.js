import { createStore } from "vuex";
import { set as setCookie, get as getCookie } from "js-cookie";

const openidKey = 'M_OPENID';
export default createStore({
  state: {
    regions: ['sf', 'la'],
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
