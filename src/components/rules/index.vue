<template>
  <div class="wrapper">
    <SketchRule
      :width="582"
      :height="482"
      :startX="startX"
      :startY="startY"
      :scale="scale"
      :thick="thick"
    ></SketchRule>
    <div ref="screensRef" id="screens" @wheel="handleWheel" @scroll="handleScroll">
      <div ref="containerRef" class="screen-container">
        <!-- <div id="canvas" :style="canvasStyle" /> -->
        <div id="canvas" :style="canvasStyle" />
      </div>
    </div>
  </div>
</template>

<script>
import SketchRule from "./sketchRuler";
const rectWidth = 160;
const rectHeight = 200;
export default {
  components: {
    SketchRule
  },
  data () {
    return {
      startX: 0,
      startY: 0,
      scale: 2,
      thick: 20
    };
  },
  computed: {
    canvasStyle () {
      return {
        width: rectWidth,
        height: rectHeight,
        transform: `scale(${this.scale})`
      };
    }
  },
  methods: {
    handleScroll () {
      const screensRect = document
        .querySelector("#screens")
        .getBoundingClientRect();


      // 标尺开始的刻度
      const startX = (screensRect.left + this.thick) / this.scale;
      const startY = (screensRect.top + this.thick) / this.scale;

      this.startX = startX;
      // console.log(startX);
      // console.log(startY);
      this.startY = startY;
    },
    // 控制缩放值
    handleWheel (e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(
          Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
        );
        this.scale = nextScale;
      }
      this.$nextTick(() => {
        this.handleScroll();
      });
    }
  },
  mounted () {
    // 滚动居中
    this.$refs.screensRef.scrollLeft =
      this.$refs.containerRef.getBoundingClientRect().width / 2 - 300; // 300 = #screens.width / 2
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  overflow: hidden;
}

body * {
  box-sizing: border-box;
  user-select: none;
}

.wrapper {
  background-color: #f5f5f5;
  position: absolute;
  top: 100px;
  left: 100px;
  width: 600px;
  height: 500px;
  border: 1px solid #dadadc;
}

#screens {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.screen-container {
  position: absolute;
  width: 5000px;
  height: 3000px;
}

.scale-value {
  position: absolute;
  left: 0;
  bottom: 100%;
}

.button {
  position: absolute;
  left: 100px;
  bottom: 100%;
}

.button-ch {
  position: absolute;
  left: 200px;
  bottom: 100%;
}
.button-en {
  position: absolute;
  left: 230px;
  bottom: 100%;
}

#canvas {
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -80px;
  width: 160px;
  height: 200px;
  background: lightblue;
  transform-origin: 50% 0;
}
</style>