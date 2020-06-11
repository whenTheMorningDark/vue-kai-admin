<template>
  <div class="wrapper">
    <div class="test">
      <g2Bar ref="g2Bar"></g2Bar>
    </div>
    <div class="test">
      <g2Line ref="g2Line"></g2Line>
    </div>
    <el-button @click.stop="changData">改变</el-button>
  </div>
</template>
<script>
import g2Bar from "@/components/G2Template/component/g2Bar";
import g2Line from "@/components/G2Template/component/g2Line";
export default {
  components: {
    g2Bar,
    g2Line
  },
  data () {
    return {
      // data: [
      //   { genre: "Sports", sold: 275 },
      //   { genre: "Strategy", sold: 115 },
      //   { genre: "Action", sold: 120 },
      //   { genre: "Shooter", sold: 350 },
      //   { genre: "Other", sold: 150 }
      // ],
      // baseOptions: {
      //   container: "g2Bar1",
      //   width: 400,
      //   height: 250
      // }
    };
  },
  methods: {
    changData () {
      let newData = [
        { genre: "Sports", sold: 75 },
        { genre: "Strategy", sold: 415 },
        { genre: "Action", sold: 320 },
        { genre: "Shooter", sold: 450 },
        { genre: "Other", sold: 550 }
      ];
      this.$refs.g2Bar.changeData(newData);
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 10px;
  position: relative;
  .test {
    width: 400px;
    height: 250px;
    position: relative;
    float: left;
    margin-right: 10px;
  }
}
</style>