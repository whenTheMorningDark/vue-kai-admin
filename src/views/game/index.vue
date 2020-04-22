<template>
  <div class="border">
    <div
      class="box"
      v-for="(item,index) in sections"
      :key="index"
      @click="draw(index)"
      :class="{circle:item === 1,cross:item === 10}"
    ></div>
  </div>
</template>

<script>
export default {
  name: "game",
  data () {
    return {
      sections: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      step: 0
    };
  },
  methods: {
    draw (index) {
      if (this.sections[index] === 0) {
        this.$set(this.sections, index, this.step % 2 === 0 ? 1 : 10);
        this.step++;
      }
      // console.log(this.checkWinner);
      let winner = this.checkWinner;
      if (winner) {
        this.$message({
          message: winner,
          type: "success"
        });
        this.step = 0;
        this.sections = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
  },
  computed: {
    status () {
      return [
        this.sections[0] + this.sections[1] + this.sections[2],
        this.sections[3] + this.sections[4] + this.sections[5],
        this.sections[6] + this.sections[7] + this.sections[8],
        this.sections[1] + this.sections[4] + this.sections[7],
        this.sections[2] + this.sections[5] + this.sections[8],
        this.sections[0] + this.sections[3] + this.sections[6],
        this.sections[0] + this.sections[4] + this.sections[8],
        this.sections[2] + this.sections[4] + this.sections[6]
      ];
    },
    // 找出胜利者
    checkWinner () {
      let winner;
      console.log(this.status);
      if (this.step >= 5) {
        winner = this.status.find(item => item === 3 || item === 30) || null;
      }
      if (winner === 3) {
        winner = "Circle";

      } else if (winner === 30) {
        winner = "Cross";
      } else if (winner === null && this.step > 8) {
        winner = "平局!";
      }
      // this.$message({
      //   message: winner,
      //   type: "success"
      // });
      console.log(winner);
      return winner;
    }
  }
};
</script>

<style lang="scss" scoped>
.border {
  width: 302px;
  height: 300px;
  border: 1px solid #000000;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  .box {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    border: 1px solid #000000;
    position: relative;
    &.circle::after {
      position: absolute;
      content: "0";
      line-height: 100px;
      text-align: center;
      width: 100px;
      height: 100px;
      font-size: 5em;
      color: yellowgreen;
      animation: ani 0.5s forwards;
    }

    &.cross::after {
      position: absolute;
      content: "X";
      color: red;
      line-height: 100px;
      text-align: center;
      width: 100px;
      height: 100px;
      font-size: 5em;
      animation: ani 0.5s forwards;
    }
  }
}
@keyframes ani {
  0% {
    opacity: 0;
    transform: rotateY(645deg) scale(0);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg) scale(1);
  }
}
</style>