
<template>
  <!-- <el-scrollbar wrap-class="scrollbar-wrapper"
                style="height:100%"> -->
  <div class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
  <!-- </el-scrollbar> -->
</template>
<script>
/* eslint-disable space-before-function-paren */

export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 50px);
  /* min-height: calc(100vh - 50px); */
  /* min-height: calc(100vh); */
  width: 100%;
  position: relative;
  overflow: hidden;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
