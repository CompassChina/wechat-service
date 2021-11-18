<template>
  <div class="profile">
      <div class="agent-card">
        <div class="flex-center">
          <div class="agent-left" style="width:100%;">
            <div class="agent-name">{{agentInfo.name}}</div>
            <div class="flex-center">
              <div class="agent-title" style="width: 60%;">地区：{{agentInfo.region}}</div>
              <div class="agent-title" style="width: 40%;">中文服务：{{agentInfo.speaking_chinese?'是':'否'}}</div>
            </div>
            <div class="flex-center">
               <div class="agent-email" style="width: 100%;">邮箱：<a :href="`mailto:${agentInfo.email}`">{{agentInfo.email}}</a></div>
            </div>
            <div class="flex-center">
              
              <div class="agent-mobile" style="width: 100%;">电话: <a :href="`tel:${agentInfo.phone_number}`">{{agentInfo.phone_number}}</a></div>
            </div>
          </div>
          <div class="agent-right">
            <div class="agent-avatar">
              <img :src="avatars[agentInfo.id % avatars.length]" alt="">
            </div>
          </div>
        </div>
        <ul class="info-lists">
          <li>
            <div class="info-content">{{agentInfo.rating}}</div>
            <div class="info-title">满意度</div>
          </li>
          <li>
            <div class="info-content">{{agentInfo.service_people}}</div>
            <div class="info-title">帮助客户</div>
          </li>
          <li>
            <div class="info-content">{{agentInfo.num_of_deals}}</div>
            <div class="info-title">成交数量</div>
          </li>
          <li>
            <div class="info-content">{{agentInfo.service_years}}年</div>
            <div class="info-title">从业时间</div>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="house-title">已售房屋：</h3>
        <div class="house-lists">
          <HouseItem class="house-list" v-for="item in houseList" :house-data="{img: regionLists[item % regionLists.length].img}"></HouseItem>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {useRouter } from 'vue-router'
import { mapState } from 'vuex'
 
import HouseItem from "../../components/HouseItem";
import { getAgentByIdApi } from "../../api/agent"

export default {
  components:{
    HouseItem
  },
  async setup(){
    const router = useRouter();
    const houseList = ref([1,2,3,4,5,6]);
    const id = router.currentRoute.value.params.id;
    const agentRes = await getAgentByIdApi(id);
    const agentInfo = ref(agentRes);

    return { agentInfo, houseList }
  },
  computed:{
    ...mapState({
      avatars: state=>state.avatars,
      regionLists: state => state.regions,
    })
  }
}
</script>

<style lang="less" scoped>
  .profile{
    background: #fff;
    padding-top: 30px;
  }
  .flex-center{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .agent-card{
    width: calc(100% - 48px);
    background: #fff;
    box-shadow: 0px 0px 6px #ddd;
    padding: 12px;
    margin: 0 auto;
  }
  .agent-left{
    .agent-name{
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .agent-title,.agent-email,.agent-mobile{
      font-size: 12px;
      width: 50%;
      color: #333;
      a {
        // color: 
      }
    }
    .agent-email{
      width: 100%;
    }
  }
  .agent-right{
    display: flex;
  }
  .agent-avatar{
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 90px;
      height: 90px;
    }
  }
  .info-lists{
    display: flex;
    justify-content: space-around;
    padding: 14px 0 0;
    text-align: center;
    li{
      list-style: none;
    }
    .info-title{
      font-size: 12px;
      color: #999;
    }
    .info-content{
      font-size: 20px;
      font-weight: bold;
      line-height: 28px;
    }
  }
  .house-lists{
    padding: 0 32px 30px;
    .house-list + .house-list{
      margin-top: 20px;
    }
  }
  .house-title{
    padding: 0 32px;
  }
</style>