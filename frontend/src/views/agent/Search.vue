<template>
    <div class="search">
        <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        >
            <template #action>
                <div @click="dialogShow = true">筛选</div>
            </template>
        </van-search>
        <van-list class="agent-list">
            <div class="list-item" v-for="(item,index) in agentLists" :key="item.name" @click="goProfile(item.id)">
                <div class="item-left flex-center">
                    <img :src="avatars[item.id % avatars.length]" alt="">
                </div>
                <div class="item-right">
                    <div class="agent-name">{{item.name}}<span class="agent-score">满意度：{{item.rating}}分</span></div>
                    <div class="flex-between">
                        <div>
                            <div class="agent-infoItem">地区：{{item.region}}</div>
                            <div class="agent-infoItem">是否支持中文：{{item.speaking_chinese?'是':'否'}}</div>
                            <div class="agent-infoItem">服务用户：{{ item.service_people }}次</div>
                        </div>
                        <div class="agent-infoRight">
                            <div class="agent-infoItem">从业：{{item.service_years}}年</div>
                            <div class="agent-infoItem">成交：{{ item.num_of_deals }}单</div>
                        </div>
                    </div>
                    <div class="agent-infoItem">邮箱：{{item.email}}</div>
                    <div class="agent-infoItem">电话：{{item.phone_number}}</div>
                </div>
            </div>
        </van-list>
        <van-popup v-model:show="dialogShow" position="bottom">
            <div class="select-container">
                <div class="select-title">选择地区：</div>
                <van-radio-group v-model="regionChecked">
                    <van-radio :name="region.name" v-for="region in regionLists">{{region.name}}</van-radio>
                </van-radio-group>
                <div class="select-title">是否支持中文：</div>
                <van-radio-group v-model="speakingChineseChecked">
                    <van-radio :name="true">是</van-radio>
                    <van-radio :name="false">否</van-radio>
                </van-radio-group>
                <van-row class="button-box" justify="center">
                    <van-button type="default" @click="onResetForm">立即重置</van-button>
                    <van-button type="primary" @click="onFilterAgent">立即筛选</van-button>
                </van-row>
                
            </div>
        </van-popup>
    </div>
</template>

<script>
import { ref } from 'vue';
import { mapState } from 'vuex';

import {Search, List, Button, Popup, Row, Col, Radio, RadioGroup} from 'vant';

import { getAgentApi, filterAgentApi } from '../../api';
export default {
    components: {
        [Search.name]: Search,
        [List.name]: List,
        [Popup.name]: Popup,
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup,
        [Row.name]: Row,
        [Button.name]: Button,
        [Col.name]: Col
    },
    async setup(){
        const value = ref('');
        const agents =  await getAgentApi();
        const agentLists = ref(agents);
        const dialogShow = ref(false);
        const regionChecked = ref('');
        const speakingChineseChecked = ref('');
        return {agentLists, value, dialogShow, regionChecked, speakingChineseChecked};
    },
    computed:{
        ...mapState({
            regionLists: state => state.regions,
            avatars: state=>state.avatars
        })
    },
    methods: {
        closeModal(){
            this.dialogShow = false;
        },
        goProfile(id){
            this.$router.push({
                name: 'Profile',
                params: {
                    id
                }
            })
        },
        async onFilterAgent(){
            let form = {};
            if(this.speakingChineseChecked !== ''){
                form.speaking_chinese = this.speakingChineseChecked;
            }

            if(this.regionChecked !== ''){
                form.region = this.regionChecked;
            }

            const agents =  await filterAgentApi(form);
            this.agentLists = agents;
            this.closeModal();
        },
        async onResetForm (){
            this.speakingChineseChecked = '';
            this.regionChecked = '';

            const agents =  await getAgentApi();
            this.agentLists = agents;
            this.closeModal();
        }
    }
}
</script>

<style lang="less" scoped>
    .flex-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .flex-between{
        display: flex;
        justify-content: space-between;
    }
    .search{
        // padding-bottom: 60px;
    }
    .agent-list{
        margin-top: 20px;
    }
    .list-item{
        display: flex;
        background: #fff;
        margin-bottom: 10px;
        padding-left: 12px;
        .item-left{
            width: 30%;
            img{
                width: 100%;
            }
        }
    }
    .agent-score{
        display: inline-block;
        font-size: 12px;
        font-weight: normal;
        color: #f55;
        padding: 2px 6px;
        border: solid 1px #f55;
        margin-left: 8px;
    }
    .item-right{
        padding: 14px 12px;
        font-size: 12px;
        .agent-name{
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .agent-infoItem{
            color: #666;
        }
        .agent-infoItem+.agent-infoItem{
            margin-top: 4px;
        }
    }
    .agent-infoRight{
        margin-left: 12px;
    }
    .select-container{
        padding: 20px 20px;
        .select-title{
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .van-checkbox-group, .van-radio-group{
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
            .van-checkbox, .van-radio{
                margin-bottom: 10px;
                margin-right: 12px;
            }
        }
        .button-box{
            margin-top: 12px;
            
            .van-button + .van-button{
                margin-left: 20px;
            }
        }
    }
</style>