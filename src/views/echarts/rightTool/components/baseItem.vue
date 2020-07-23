<template>
  <div class="baseItem">
    <div class="baseItem-label">{{label}}</div>
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
    width: 50px;
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
