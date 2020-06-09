<template>
  <div>
    <KaCircle :percent="percent" :strokeColor="color">
      <span style="font-size:24px">{{percent}}%</span>
    </KaCircle>
    <el-button @click="add" size="mini">+</el-button>
    <el-button @click="reduce" size="mini">-</el-button>
    <KaCircle percent="80">
      <span style="font-size:24px">80%</span>
    </KaCircle>
    <KaCircle percent="100" strokeColor="red">
      <span style="font-size:24px">100%</span>
    </KaCircle>
  </div>
</template>

<script>
import KaCircle from "@/components/Circle/index";
export default {
  components: {
    KaCircle
  },
  data () {
    return {
      percent: 0
    };
  },
  computed: {
    color () {
      let color = "#2db7f5";
      if (this.percent === 100) {
        color = "#5cb85c";
      }
      return color;
    }
  },
  methods: {
    add () {
      this.percent += 10;
    },
    reduce () {
      if (this.percent <= 0) {
        return;
      }
      this.percent -= 10;
    }
  }
};
</script>

<style>
</style>