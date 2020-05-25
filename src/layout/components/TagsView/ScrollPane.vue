<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container">
    <slot />
  </el-scrollbar>
</template>

<script>
// const tagAndTagSpacing = 4;
export default {
  name: "ScrollPane",
  data () {
    return {
      left: 0
    };
  },
  computed: {
    scrollWrapper () {
      return this.$refs.scrollContainer.$refs.wrap;
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  /deep/ {
    .el-scrollbar__bar {
      bottom: 0;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>