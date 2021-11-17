<template>
  <div class="house-item">
      <div class="house-left">
          <div class="house-imgBox">
              <img src="//www.compass.com/m3/cb839e3527778110e07f20ccb5228df62bba2931/165x165.jpg" alt="">
          </div>
      </div>
      <div class="house-right">
          <div class="house-name">538 9th St, Unit TWNHS</div>
            <div class="house-subtitle">Park Slope</div>
            <div class="house-price">$3,795,000</div>
            <div class="house-stats">
                <span>4室4卫</span>
            </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup(props){
        const houseData = ref({});
    }
}
</script>

<style lang="less" scoped>
    .house-item{
        border: 1px solid #DADADA;
        display: flex;
        padding: 10px;
        background: #fff;
        font-family: Helvetica;
        font-size: 12px;
    }
    .house-right{
        padding: 0 10px;
    }
    .house-imgBox{
        width: 100px;
        height: 77px;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .house-name{
        margin-bottom: 8px;
    }
    .house-subtitle{
        margin-bottom: 6px;
        color: #666;
    }
    .house-price{
        margin-bottom: 6px;
    }
    .house-stats{
    }
</style>