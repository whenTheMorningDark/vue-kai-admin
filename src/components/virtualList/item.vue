<template>
  <p>
    <span style="color:red">{{item.id}}</span>
    {{item.value}}
  </p>
</template>


<script>
export default {
  props: {
    // 所有列表数据
    item: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>


<style scoped>
</style>