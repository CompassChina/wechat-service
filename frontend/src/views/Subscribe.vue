<template>
  <div class="subscribe">
      <h4>订阅地区：</h4>
      <van-list class="agent-list">
            <van-cell-group inset>
                <van-cell center v-for="item in regionLists" :key="item" :title="item">
                    <template #right-icon>
                        <van-button plain hairline  type="primary"  size="mini">订阅</van-button>
                    </template>
                </van-cell>
            </van-cell-group>
      </van-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import {List, Cell, CellGroup, Button} from 'vant';

export default {
    components: {
        [List.name]: List,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        [Button.name]: Button,
    },
    setup(){

    },
    computed: {
        ...mapState({
            regionLists: state => state.regions,
        })
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