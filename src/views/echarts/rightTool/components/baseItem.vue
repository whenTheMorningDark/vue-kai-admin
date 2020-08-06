<template>
  <div class="baseItem">
    <div class="baseItem-label" :style="{width:width+'px'}">{{label}}</div>
    <div class="baseItem-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "baseItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 50
    }
  }
};
</script>

<style lang="scss" scoped>
.baseItem {
  width: 100%;
  height: 100%;
  display: flex;
  .baseItem-label {
    // text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .baseItem-content {
    flex: 1;
  }
}
</style>
