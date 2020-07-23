<template>
  <!-- <div class="resizeBox" :style="cBoxStyle" @click="handClickFun" ref="resizeBox" v-drag>
    <slot></slot>
  </div>-->
  <div ref="resizeBox">
    <vdr
      :w="item.width"
      :h="item.height"
      :x="item.x"
      :y="item.y"
      @dragging="onDrag"
      @resizing="onResize"
      v-contextmenu:contextmenu
      :active="item.active"
      @deactivated="onDeactivated"
      @activated="onActivated"
      :prevent-deactivation="preventActiveBehavior"
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
// import { debounce } from "@/utils/common";
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
      currentItem: null,
      preventActiveBehavior: false
    };
  },
  components: {

  },
  methods: {
    onResize (x, y, width, height) {
      this.item = Object.assign(this.item, { x, y, width, height });
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
      // console.log(this.item);
      // this.$set(this.item, "active", true);
      this.currentItem = this.item;
      this.$emit("handleContextmenu", this.item);
      // if (!this.item.active) {
      //   this.$set(this.item, "active", true);
      // }
    },
    // 点击其它区域取消active状态
    onDeactivated () {
      console.log("axxx");
      // this.currentItem = {};
      // this.$set(this.item, "active", true);
      this.$emit("onDeactivated", {});
    },
    // 选中的状态
    onActivated () {
      // this.$set(this.item, "active", true);
      console.log("xxxxadwdw");
      this.$emit("onActivated", this.item);

    }
  }
};
</script>

<style>
</style>