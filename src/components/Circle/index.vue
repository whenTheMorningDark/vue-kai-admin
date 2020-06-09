<template>
  <div class="ka-circle">
    <svg viewBox="0 0 100 100">
      <defs>
        <linearGradient :id="id" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2d8cf0" />
          <stop offset="100%" stop-color="#2d8cf0" />
        </linearGradient>
      </defs>
      <path
        :d="pathString"
        :stroke="trailColor"
        :stroke-width="trailWidth"
        :fill-opacity="0"
        :stroke-linecap="strokeLinecap"
      />
      <path
        :d="pathString"
        :stroke-linecap="strokeLinecap"
        :stroke="strokeValue"
        :stroke-width="computedStrokeWidth"
        fill-opacity="0"
        :style="pathStyle"
      />
    </svg>
    <div :class="innerClasses">
      <slot>123</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "kaCircle",
  props: {
    strokeColor: {
      type: [String, Array],
      default: "#2d8cf0"
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    trailColor: {
      type: String,
      default: "#eaeef2"
    },
    strokeLinecap: {
      validator (value) {
        return ["square", "round"].includes(value);
      },
      default: "round"
    },
    trailWidth: {
      type: Number,
      default: 5
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      id: `ivu-chart-circle-${this.random(3)}`
    };
  },
  methods: {
    random (len = 32) {
      const $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const maxPos = $chars.length;
      let str = "";
      for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return str;
    }
  },
  computed: {
    len () {
      return Math.PI * 2 * this.radius;
    },
    pathStyle () {
      let style = {
        "stroke-dasharray": `${this.len}px ${this.len}px`,
        "stroke-dashoffset": `${((100 - this.percent) / 100 * this.len)}px`,
        "transition": "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
      };
      return style;
    },
    computedStrokeWidth () {
      return this.percent === 0 ? 0 : this.strokeWidth;
    },
    radius () {
      return 50 - this.strokeWidth / 2;
    },
    pathString () {
      console.log(this.radius);
      return `M 50,50 m 0,-${this.radius}
                    a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
                    a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`;

    },
    strokeValue () {
      let color = this.strokeColor;
      if (typeof this.strokeColor !== "string") {
        color = `url(#${this.id})`;
      }
      return color;
    },
    innerClasses () {
      return "ka-circle-inner";
    }
  }
};
</script>

<style>
.ka-circle {
  position: relative;
  display: inline-block;
  width: 120px;
  height: 120px;
}
.ka-circle-inner {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  line-height: 1;
}
</style>