<template>
  <div class="subscribe">
      <h4>订阅地区：</h4>
      <van-list class="agent-list">
            <van-cell-group inset>
                <van-cell center v-for="item in regionLists" :key="item" :title="item">
                    <template #right-icon>
                        <van-button v-if="subscribeStatus && subscribeStatus[item]" plain hairline  type="warning"  size="mini" @click="onRemoveSubscribe(item)">取消订阅</van-button>
                        <van-button v-else plain hairline  type="primary"  size="mini" @click="onSubscribe(item)">订阅</van-button>
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
            const userSubscribes = await getUserSubscribeApi(this.openid) || [];
            this.regionLists.forEach(region => {
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
</style>