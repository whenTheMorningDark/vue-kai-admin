<template>
  <!-- <div class="resizeBox" :style="cBoxStyle" @click="handClickFun" ref="resizeBox" v-drag>
    <slot></slot>
  </div>-->
  <vdr :w="item.w" :h="item.h" :x="item.x" :y="item.y" @dragging="onDrag" @resizing="onResize">
    <slot></slot>
  </vdr>
</template>

<script>
export default {
  name: "resizeBox",
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      timer: null
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
      this.item = Object.assign(this.item, { x, y });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$emit("onDrag", this.item);
      }, 200);
    }
  }
};
</script>

<style>
</style>