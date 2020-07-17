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
export default {
  name: "resizeBox",
  mounted () {
    this.$nextTick(() => {
      this.keyevent();
    });
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      timer: null,
    };
  },
  components: {

  },
  methods: {
    keyevent () {
      console.log(this.$refs.resizeBox);
      // let el = this.$refs.resizeBox;
      document.onkeydown = function (e) { // 按下键盘
        console.log(e);
        if (e.keyCode === 17) {
          console.log("触发");
        }
        // switch (e.keyCode) {
        //   case 16:
        //     that.isshift = true;
        //     break;
        //   case 17:
        //     that.isctrl = true;
        //     break;
        // }
      };
    },
    onResize (x, y, width, height) {
      this.item = Object.assign(this.item, { x, y, w: width, h: height });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit("onResize", this.item);
      }, 200);
      // throttle(this.emitFun(this.item), 2300);
    },
    onDrag (x, y) {
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
      this.$set(this.item, "active", true);
    },
    // 选中的状态
    onActivated () {
      this.$emit("onActivated", this.item);
    }
  }
};
</script>

<style>
</style>