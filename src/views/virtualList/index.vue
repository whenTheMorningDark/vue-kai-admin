<template>
  <div class="virtualListView">
    <virtualList :data="data"></virtualList>
  </div>
</template>

<script>
import virtualList from "@/components/virtualList";
export default {
  name: "virtualListView",
  components: {
    virtualList
  },
  data() {
    return {
      data: Array.from({ length: 300 }, (k, v) => ({
        value: "王小虎" + v,
        id: v
      }))
    };
  }
};
</script>

<style>
.virtualListView{
  padding:10px;
}
</style>