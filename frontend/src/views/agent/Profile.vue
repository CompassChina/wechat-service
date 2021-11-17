<template>
  <div class="profile">
      <div class="agent-card">
        <div class="flex-center">
          <div class="agent-left">
            <div class="agent-name">Ronit Abraham</div>
            <div class="agent-title">Licensed Real Estate Salesperson</div>
            <div class="agent-email">邮箱：<a href="mailto:ronit.abraham@compass.com">ronit.abraham@compass.com</a></div>
            <div class="agent-mobile">电话: <a href="tel:917-572-2583">917-572-2583</a></div>
          </div>
          <div class="agent-right">
            <div class="agent-avatar">
              <img src="https://d2787ndpv5cwhz.cloudfront.net/755b72af1b71bc94a431902bf74e47cdf4069a30/300x300.jpg" alt="">
            </div>
          </div>
        </div>
        <ul class="info-lists">
          <li>
            <div class="info-content">412</div>
            <div class="info-title">帮助客户</div>
          </li>
          <li>
            <div class="info-content">412</div>
            <div class="info-title">累计带看</div>
          </li>
          <li>
            <div class="info-content">412</div>
            <div class="info-title">成交数量</div>
          </li>
          <li>
            <div class="info-content">2年</div>
            <div class="info-title">从业时间</div>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="house-title">已售房屋：</h3>
        <div class="house-lists">
          <HouseItem class="house-list" v-for="item in houseList" :house-data={item}></HouseItem>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import HouseItem from "../../components/HouseItem";

export default {
  components:{
    HouseItem
  },
  setup(){
    const houseList = ref([1,2,3,4,5,6]);

    return { houseList }
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
    }
    .agent-title,.agent-email,.agent-mobile{
      font-size: 12px;
      color: #333;
      a {
        // color: 
      }
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
    padding: 0;
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
    }
  }
  .house-lists{
    padding: 0 32px;
    .house-list + .house-list{
      margin-top: 20px;
    }
  }
  .house-title{
    padding: 0 32px;
  }
</style>