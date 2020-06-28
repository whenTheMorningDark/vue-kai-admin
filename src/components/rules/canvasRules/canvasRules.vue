<template>
  <canvas class="rules" ref="$canvas"></canvas>
</template>

<script>
import { drawHorizontalRuler, drawVerticalRuler } from "./utils";
export default {
  name: "canvasRules",
  data () {
    return {
      $canvas: {}, // canvasdom实例
      canvasContext: {} // canvas2D对象
    };
  },
  props: {
    vertical: Boolean, // 是否是垂直状态
    canvasConfigs: Object, // canvas配置
    width: Number, // canvas宽度
    height: Number, // canvas高度
    scale: Number, // 缩放比例
    start: Number, // 开始的位置
    selectStart: Number,
    selectLength: Number
  },
  watch: {
    start () {
      this.drawRuler();
    }
  },
  methods: {
    // 初始化canvas
    initCanvasRef () {
      this.$canvas = this.$refs.$canvas;
      this.canvasContext = this.$canvas && this.$canvas.getContext("2d");
    },
    // 绘制图形
    updateCanvasContext () {
      const { ratio } = this.canvasConfigs;
      // 比例宽高
      this.$canvas.width = this.width * ratio;
      this.$canvas.height = this.height * ratio;
      const ctx = this.$canvas.getContext("2d");
      ctx.font = `${12 * ratio}px -apple-system, 
                "Helvetica Neue", ".SFNSText-Regular", 
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB", 
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`;
      ctx.lineWidth = 1;
      ctx.textBaseline = "middle";
    },
    // 绘制刻度尺
    drawRuler () {
      const options = {
        scale: this.scale,
        width: this.width,
        height: this.height,
        canvasConfigs: this.canvasConfigs
      };
      if (this.vertical) {
        drawVerticalRuler(
          this.canvasContext,
          this.start,
          { y: this.selectStart, height: this.selectLength },
          options
        );
      } else {
        drawHorizontalRuler(
          this.canvasContext,
          this.start,
          { x: this.selectStart, width: this.selectLength },
          options
        );
      }
    }
  },
  mounted () {
    this.initCanvasRef(); // 初始化加载canvas
    this.updateCanvasContext();
    this.drawRuler();
  }
};
</script>

<style>
</style>