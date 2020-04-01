<template>
  <div class="item">
    <div class="item-label">{{ label }}</div>
    <div class="item-con">
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MxItem',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  padding: 25px 5px;
  height: 28px;
  align-items: center;
  .item-label {
    flex: 1;
    font-size: 14px;
  }
  .item-con {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /deep/ .el-color-picker {
      height: 28px;
      .el-color-picker__trigger {
        height: 100%;
      }
    }
  }
}
</style>
