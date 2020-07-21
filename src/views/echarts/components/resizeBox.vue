<template>
  <!-- <div class="resizeBox" :style="cBoxStyle" @click="handClickFun" ref="resizeBox" v-drag>
    <slot></slot>
  </div>-->
  <div ref="resizeBox">
    <vdr
      :w="item.w"
      :h="item.h"
      :x="item.x"
      :y="item.y"
      @dragging="onDrag"
      @resizing="onResize"
      v-contextmenu:contextmenu
      :active="item.active"
      @deactivated="onDeactivated"
      @activated="onActivated"
      :parent="'.add-wrapper'"
    >
      <!-- v-contextmenu:contextmenu -->
      <slot></slot>
    </vdr>
    <v-contextmenu ref="contextmenu" @contextmenu="handleContextmenu">
      <v-contextmenu-item @click="delFun">删除</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script>
import event from "./event";
export default {
  name: "resizeBox",
  mounted () {
    // this.$nextTick(() => {
    //   this.keyevent();
    // });
  },
  mixins: [event],
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      timer: null,
      currentItem: null
    };
  },
  components: {

  },
  methods: {
    onResize (x, y, width, height) {
      this.item = Object.assign(this.item, { x, y, w: width, h: height });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit("onResize", this.item);
      }, 200);
      // throttle(this.emitFun(this.item), 2300);
    },
    onDrag (x, y) {
      console.log("onDrag");
      this.item = Object.assign(this.item, { x, y });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit("onDrag", this.item);
      }, 200);
    },
    // 删除方法
    delFun () {
      this.$emit("delFun", this.item);
    },
    // 右键菜单
    handleContextmenu () {
      if (!this.item.active) {
        this.$set(this.item, "active", true);
      }
    },
    // 点击其它区域取消active状态
    onDeactivated () {
      // this.currentItem = {};
      // this.$set(this.item, "active", true);
    },
    // 选中的状态
    onActivated () {
      // console.log(this.item);
      this.currentItem = this.item;
      this.$emit("onActivated", this.item);
    }
  }
};
</script>

<style>
</style>