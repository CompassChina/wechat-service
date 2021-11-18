<template>
  <div class="subscribe">
      <h4>订阅地区：</h4>
      <van-list class="agent-list">
            <van-cell-group>
                <van-cell center v-for="item in regionLists" :key="item.name">
                    <template #title>
                        <div class="region-item">
                            <div class="region-imgbox">
                                <img :src="item.img" alt="">
                            </div>
                            <div class="region-info">
                                <div>{{item.name}}</div>
                                <div class="region-num">房源数量：{{item.num}}</div>
                            </div>
                            <span class="custom-title"></span>
                        </div>
                    </template>
                    <template #right-icon>
                        <van-button v-if="subscribeStatus && subscribeStatus[item.name]" plain hairline  type="warning"  size="mini" @click="onRemoveSubscribe(item.name)">取消订阅</van-button>
                        <van-button v-else plain hairline  type="primary"  size="mini" @click="onSubscribe(item.name)">订阅</van-button>
                    </template>
                </van-cell>
            </van-cell-group>
      </van-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {List, Cell, CellGroup, Button, Notify} from 'vant';

import { addSubscribeApi, getUserSubscribeApi, removeSubscribeApi } from '../api/subscribe';

export default {
    components: {
        [List.name]: List,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        [Button.name]: Button,
    },
    data(){
        return {
            subscribeStatus: {}
        }
    },
    async mounted(){
        this.updateSubscribeStatus();
    },
    computed: {
        ...mapState({
            regionLists: state => state.regions,
            openid: state => state.openid,
        }),
    },
    methods:{
        async updateSubscribeStatus(){
            if(!this.openid){
                return
            }
            const userSubscribes = await getUserSubscribeApi(this.openid) || [];
            this.regionLists.forEach(it => {
                let region = it.name;
                this.subscribeStatus[region] = !!userSubscribes.find(item => item.region === region);
            });
        },
        async onSubscribe(region){
            const form = {
                region: region,
                openid: this.openid
            }
            const res = await addSubscribeApi(form);

            if(res.id || res.msg === '已订阅'){
                this.subscribeStatus[region] = true;
                this.updateSubscribeStatus();
            }
        },
        async onRemoveSubscribe(region){
            const form = {
                region: region,
                openid: this.openid
            }
            const res = await removeSubscribeApi(form);

            if(res.id){
                this.subscribeStatus[region] = false;
                this.updateSubscribeStatus();
            }else{
                Notify({
                    type: 'primary',
                    message: res.msg
                })
            }
        },
    }

}
</script>
<style lang="less" scoped>
.subscribe{
    h4{
        padding: 0 14px;
    }
}
.van-cell-group{
    background: none;
}
.van-cell{
    margin-bottom: 12px;
}
.region-item{
    display: flex;
    .region-imgbox{
        width: 100px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    img{
        width: 100px;
    }
}

.region-info{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 20px;
    font-size: 18px;
    font-weight: bold;

    .region-num{
        color: #666;
        font-size: 12px;
    }
}
</style>