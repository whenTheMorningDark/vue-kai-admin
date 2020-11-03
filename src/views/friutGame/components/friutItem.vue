<template>
  <div class="friutItem">
    <img :src="item.src" width="100%" height="100%">
  </div>
</template>

<script>
export default {
  name: "friutItem",
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="scss" scoped>
.friutItem{
  width:45px;
  height:45px;
  // padding-top:50%;
  // border-radius:4px;
  // border:1px solid #ddd;
}
</style>

