<template>
  <!-- <div class="resizeBox" :style="cBoxStyle" @click="handClickFun" ref="resizeBox" v-drag>
    <slot></slot>
  </div>-->
  <div ref="resizeBox">
    <!-- @deactivated="onDeactivated" -->
    <!-- @activated="onActivated" -->
    <vdr
      :w="item.width"
      :h="item.height"
      :x="item.x"
      :y="item.y"
      @dragging="onDrag"
      @resizing="onResize"
      v-contextmenu:contextmenu
      :active.sync="item.active"
      :prevent-deactivation="preventActiveBehavior"
      :parent="'.add-wrapper'"
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

// import { debounce } from "@/utils/common";
export default {
  name: "resizeBox",
  mounted () {
    // this.$nextTick(() => {
    //   this.keyevent();
    // });
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
      preventActiveBehavior: true
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
      this.$emit("handleContextmenu", this.item);
    },
    // // 点击其它区域取消active状态
    // onDeactivated () {
    //   console.log("onDeactivated");
    //   // this.currentItem = {};
    //   // this.$set(this.item, "active", true);
    //   this.$emit("onDeactivated", {});
    // },
    // 选中的状态
    onActivated () {
      console.log("onActivated");
      this.$emit("onActivated", this.item);
    }
  }
};
</script>

<style>
</style>