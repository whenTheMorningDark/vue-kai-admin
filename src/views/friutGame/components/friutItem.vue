<template>
  <div class="friutItem" :class="{active:item.active}">
    <img :src="item.src" width="90%" height="90%">
    <span class="rate">X{{item.rate}}</span>
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
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .rate{
    // text-align: center;
    display:flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }
  &.active{
    background-color:red;
    border-radius:4px;
    .rate{
      color: #ffffff;
    }
  }
  // padding-top:50%;
  // border-radius:4px;
  // border:1px solid #ddd;
}
</style>

