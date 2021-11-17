<template>
    <div class="main">
        <router-view />
    </div>
    <van-tabbar class="tabbar" v-model="active">
        <van-tabbar-item icon="search" @click="switchTo('Search')">经纪人</van-tabbar-item>
        <van-tabbar-item icon="todo-list-o" @click="switchTo('Subscribe')">订阅</van-tabbar-item>
        <van-tabbar-item icon="user-o" @click="switchTo('My')">我的</van-tabbar-item>
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