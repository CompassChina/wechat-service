<template>
    <div class="main">
        <suspense>
            <router-view />
        </suspense>
    </div>
    <van-tabbar class="tabbar" v-model="active">
        <van-tabbar-item name="Search" icon="search" @click="switchTo('Search')">经纪人</van-tabbar-item>
        <van-tabbar-item name="Subscribe" icon="todo-list-o" @click="switchTo('Subscribe')">订阅房源</van-tabbar-item>
        <!-- <van-tabbar-item name="My" icon="user-o" @click="switchTo('My')">我的</van-tabbar-item> -->
    </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
    components:{
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    setup(){
        
    },
    data(){
        return {
            active: this.$route.name
        }
    },
    methods:{
        switchTo(name){
            this.$router.replace({name})
        }
    }
}
</script>

<style lang="less" scoped>
.main{
    padding-bottom: 100px;
}
</style>