<template>
  <div class="friutGame z-h-100">
    <div class="friutGame-wrapper">
      <div class="friut-list" v-for="item in itemData"  :key="item.direction" :class="['direction'+item.direction]">
        <friutItem v-for="sitem in item.children" :item="sitem" :key="sitem.name"></friutItem>
      </div>
    </div>
  </div>
</template>

<script>
import friutItem from "./components/friutItem";
export default {
  name: "friutGame",
  components: {
    friutItem
  },
  data() {
    return {
      itemData: [
        { direction: "top", children: [
          {name: "bigApple", src: require("./images/bigApple.png"), active: true, rate: 20},
          {name: "smallApple", src: require("./images/smallApple.png"), rate: 10, active: false, },
          {name: "bigBanana", src: require("./images/bigBanana.png"), rate: 25, active: false, },
          {name: "smallBanana", src: require("./images/smallBanana.png"), rate: 15, active: false, }
        ]},
        { direction: "right", children: [
          {name: "bigPear", src: require("./images/bigPear.png"), rate: 20, active: false, },
          {name: "smallPear", src: require("./images/smallPear.png"), rate: 10, active: false, },
          {name: "bigMelon", src: require("./images/bigMelon.png"), rate: 30, active: false, },
        ]},
        { direction: "bottom", children: [
          {name: "smallMelon", src: require("./images/smallMelon.png"), rate: 15, active: false, },
          {name: "bigOrange", src: require("./images/bigOrange.png"), rate: 20, active: false, },
          {name: "smallOrange", src: require("./images/smallOrange.png"), rate: 10, active: false, }
        ]},
        { direction: "left", children: [
          {name: "smallStar", src: require("./images/smallStar.png"), rate: 40, active: false, },
          {name: "bigStar", src: require("./images/bigStar.png"), rate: 20, active: false, },
        ]}
      ],
      friutData: [],
      timer: null
    };
  },
  methods: {
    // startIndex 起始运动的下表
    // endIndex 截至的运动下标
    // targetMove(startIndex, endIndex, n = 2, last, lastNumber = 3) {
    //   let direction = startIndex < endIndex;
    //   let currentIndex = direction ? startIndex : endIndex;
    //   n--;
    //   clearInterval(this.timer);
    //   this.timer = setInterval(() => {
    //     if (currentIndex >= endIndex) {
    //       clearInterval(this.timer);
    //       // fn && fn();
    //       if (n > 0 && !last) {
    //         this.targetMove(-1, this.friutData.length - 1, n, false, lastNumber);
    //       } else if (n === 0 && !last) {
    //         console.log("last");
    //         this.targetMove(-1, lastNumber, 2, true);
    //       }
    //     } else {
    //       currentIndex = direction ? currentIndex + 1 : currentIndex - 1;
    //       // startIndex++;
    //       this.friutData.forEach(v => {
    //         this.$set(v, "active", false);
    //       });
    //       this.$set(this.friutData[currentIndex], "active", true);
    //     }
    //   }, 200);
    // },
    targetMove(startIndex, endIndex, fn) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        startIndex++;
        if (startIndex >= endIndex) {
          clearInterval(this.timer);
          fn && fn();
        }
        this.friutData.forEach(v => {
          this.$set(v, "active", false);
        });
        this.$set(this.friutData[startIndex], "active", true);
      }, 200);
    },
    initMove({startIndex, endIndex, time}) {
      if (time <= 0) {
        console.log("结束");
        this.targetMove(startIndex, 4);
      } else {
        time--;
        this.targetMove(startIndex, endIndex, () => {

          this.initMove({startIndex, endIndex, time});
        });
      }

    }
  },
  mounted () {
    this.friutData = this.itemData.reduce((cur, next) => cur.concat(...next.children), []);
    let initParams = {
      startIndex: -1,
      endIndex: this.friutData.length - 1,
      time: 2
    };
    this.initMove(initParams);
    // this.targetMove(-1, this.friutData.length - 1);
  }
};
</script>

<style lang="scss" scoped>
.friutGame-wrapper{
  width: 350px;
  height: 350px;
  position: relative;
  margin:0 auto;
  padding-top: 20px;
}
.directiontop{
  display:flex;
}
.directionright{
  display:flex;
  flex-direction:column;
  position:absolute;
  right:0;
  top: 87.5px;
}
.directionbottom{
  display:flex;
  position:absolute;
  bottom:0px;
  width:350px;
  height:87.5px;
  flex-direction: row-reverse;
  right: 87.5px;
  // flex-direction:column-reverse;
  // right:87.5px;
}
.directionleft{
  display:flex;
  flex-direction:column-reverse;
  top: 87.5px;
  left: 0px;
}
.friutItem{
    width: 87.5px;
    height:87.5px;
    padding:10px;
  }


.toolbar{
  width: 100%;
  height:40px;
  display:flex;
  align-items:center;
  padding:0 10px;
}
.previewDos{
  height: calc(100% - 40px);
}
</style>