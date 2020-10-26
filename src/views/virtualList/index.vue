<template>
  <div class="virtualListView">
    <!-- <div class="virtualListView-title">
      列表不定高的虚拟列表
    </div> -->
    <virtualList :listData="data" :estimatedItemSize="100" v-slot="slotProps">
      <Item :item="slotProps.item"/>
    </virtualList>
  </div>
</template>

<script>
import virtualList from "@/components/virtualList/test";
import Item from "@/components/virtualList/item";
import faker from "faker";
let data = [];
for (let id = 0; id < 100; id++) {
  data.push({
    id,
    value: faker.lorem.sentences() // 长文本
  });
}
export default {
  name: "virtualListView",
  components: {
    virtualList,
    Item
  },
  data() {
    return {
      data
    };
  }
};
</script>

<style>
.virtualListView{
  padding:10px;
  height: 400px;
}
</style>