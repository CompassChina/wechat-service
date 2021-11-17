import { createStore } from "vuex";

export default createStore({
  state: {
    regions: ['sf', 'la'],
  },
  mutations: {
    COMMIT_REGIONS(state, value){
      state.regions = value;
    }
  },
  actions: {},
  modules: {},
});
