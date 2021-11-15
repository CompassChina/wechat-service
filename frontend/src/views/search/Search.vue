<template>
  <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
  />
  <van-list>
    <!-- <van-card
        v-for="item in list"
        :key="item"
        price="区域"
        desc="是否支持中文"
        title="agent姓名"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    /> -->
    <div class="list-item">
        <div class="item-left">
            <img src="https://img.yzcdn.cn/vant/ipad.jpeg" alt="">
        </div>
        <div class="item-right">
            <div>Agent姓名</div>
        </div>
    </div>
  </van-list>
</template>

<script>
import { ref } from 'vue';
import { Search, List, Card } from 'vant';

export default {
    components: {
        [Search.name]: Search,
        [List.name]: List,
        [Card.name]: Card
    },
    setup(){
        const list = ref([1,2,3,4,5,6]);
        const value = ref('');
        return { list, value };
    }
}
</script>

<style lang="less" scoped>

</style>