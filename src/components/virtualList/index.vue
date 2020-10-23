<template>
    <!-- virtualList -->
        <el-scrollbar class="virtualList z-h-100" ref="scrollbar">
        <div class="virtualList-phantom" ref="content" :style="{height:contentHeight}">
          <div class="virtualList-wrapper" ref="wrapper">
            <div
              class="virtualList-phantom-item"
              v-for="item in visibleData" :key="item.id"
              :style="{height:itemHeight+'px'}"
            >
              {{item.value}}
            </div>
          </div>
        </div>
      </el-scrollbar>
</template>

<script>
export default {
  name: "virtualList",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: Number,
      default: 30
    }
  },
  computed: {
    contentHeight() {

      return this.data.length * this.itemHeight + "px";
    }
  },
  data() {
    return {
      visibleData: [] // 可视的数据
    };
  },
  mounted () {
    this.updateVisibleData();
    this.handleScroll();
  },
  methods: {
    updateVisibleData(scrollTop = 0) {
      const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight);
      const start = Math.floor(scrollTop / this.itemHeight);
      const end = start + visibleCount;
      this.visibleData = this.data.slice(start, end);
      let pH = start * this.itemHeight;
      this.$refs.content.style.webkitTransform = `translate3d(0, ${-pH}px, 0)`;
      this.$refs.wrapper.style.webkitTransform = `translate3d(0, ${pH * 2}px, 0)`;
    },
    handleScroll() {
      this.$nextTick(() => {
        let scrollbarEl = this.$refs.scrollbar.wrap;
        scrollbarEl.onscroll = () => {
          var st = this.$refs.scrollbar.$refs.wrap.scrollTop; // 滚动条距离顶部的距离
          this.updateVisibleData(st);
        };
      });
    },
  }
};
</script>

<style lang="scss">
.z-h-100{
  height: 100%;
}
.virtualList{
  width:100%;
  height:400px;
  position: relative;
  overflow: hidden;
  border: 1px solid #aaa;
  .virtualList-phantom{
    width:100%;
    height: 600px;
  }
  .virtualList-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
}
</style>