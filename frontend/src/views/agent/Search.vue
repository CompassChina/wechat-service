<template>
    <div>
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
            <div class="list-item" v-for="item in agentLists" :key="item.name">
                <div class="item-left flex-center">
                    <img src="https://img.yzcdn.cn/vant/ipad.jpeg" alt="">
                </div>
                <div class="item-right">
                    <div class="agent-name">{{item.name}}<span class="agent-score">满意度：5分</span></div>
                    <div class="agent-region color-grey">地区：{{item.region}}</div>
                    <div class="agent-chinese color-grey">是否支持中文：{{item.speaking_chinese?'是':'否'}}</div>
                    <div class="color-grey">服务用户522次</div>
                </div>
            </div>
        </van-list>
        <van-popup v-model:show="dialogShow" position="bottom">
            <div class="select-container">
                <div class="select-title">选择地区：</div>
                <van-checkbox-group v-model="regionChecked">
                    <van-checkbox :name="region" v-for="region in regionLists">{{region}}</van-checkbox>
                </van-checkbox-group>
                <van-row class="button-box" justify="center">
                    <van-button type="primary" @click="dialogShow = false">主要按钮</van-button>
                </van-row>
                
            </div>
        </van-popup>
    </div>
</template>

<script>
import { ref } from 'vue';
import { Search, List, Button, Checkbox, Popup, CheckboxGroup, Row, Col} from 'vant';

import { getAgent } from '../../api';
export default {
    components: {
        [Search.name]: Search,
        [List.name]: List,
        [Popup.name]: Popup,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [Row.name]: Row,
        [Button.name]: Button,
        [Col.name]: Col
    },
    async setup(){
        const value = ref('');
        const agents =  await getAgent();
        const agentLists = ref(agents);
        const dialogShow = ref(false);
        const regionChecked = ref([]);
        const regionLists = ref(['地区1', '地区2', '地区3', '地区4', '地区5', '地区6', '地区7', '地区8', '地区9',])
        return { agentLists, value, dialogShow, regionChecked, regionLists};
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
    .color-grey{
        color: #666;
    }
    .flex-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .agent-list{
        margin-top: 20px;
    }
    .list-item{
        display: flex;
        background: #fff;
        margin-bottom: 10px;
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
        padding: 14px 20px;
        font-size: 12px;
        .agent-name{
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .agent-region,.agent-chinese{
            margin-bottom: 4px;
        }
    }
    .select-container{
        padding: 20px 20px;
        .select-title{
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .van-checkbox-group{
            display: flex;
            flex-wrap: wrap;
            .van-checkbox{
                margin-bottom: 10px;
                margin-right: 12px;
            }
        }
        .button-box{
            margin-top: 12px;
        }
    }
</style>