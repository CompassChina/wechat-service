import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


router.beforeEach((to, from) =>{
    if(to.query && to.query.openid){
        store.commit('COMMIT_OPENID',to.query.openid);
    }
})
createApp(App).use(store).use(router).mount("#app");
