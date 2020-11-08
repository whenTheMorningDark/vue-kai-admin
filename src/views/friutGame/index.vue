<template>
  <div class="friutGame z-h-100">
    <div style="overflow:hidden">
      <div class="friutGame-wrapper">
        <div class="friut-list" v-for="item in itemData"  :key="item.direction" :class="['direction'+item.direction]">
          <friutItem v-for="sitem in item.children" :item="sitem" :key="sitem.name"></friutItem>
        </div>
      </div>
      <div class="pay-area">
        <AreaForm @submit="submitFun" @change="changeFun"/>
      </div>
    </div>
    <div class="calc-area">
      <div class="calc-area-item" v-for="item in this.friutData" :key="item.name">
        <p>{{item.name}}</p>
        <p>{{item.account}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import friutItem from "./components/friutItem";
import AreaForm from "./components/areaForm";
export default {
  name: "friutGame",
  components: {
    friutItem,
    AreaForm
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
    // 运动函数 startIndex 初始位置 endIndex 结束位置 fn回调
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
    initMove({startIndex, endIndex, time, targetNumber}) {
      if (time <= 0) {
        this.targetMove(startIndex, targetNumber);
      } else {
        time--;
        this.targetMove(startIndex, endIndex, () => {
          this.initMove({startIndex, endIndex, time, targetNumber});
        });
      }
    },
    getRamdon(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    submitFun(form) { // 点击购买
      console.log(form);
      // for (let key in form) {
      //   // this.$set()
      //   this.friutData.forEach(v => {
      //     if (key === v.name) {
      //       this.$set(v, "account", v.rate * form[key]);
      //     }
      //   });
      // }
      // console.log(this.friutData);
    },
    changeFun({key, value}) {
      let target = this.friutData.find(v => v.name === key) || {};
      this.$set(target, "account", target.rate * value);
    }
  },
  mounted () {
    this.friutData = this.itemData.reduce((cur, next) => cur.concat(...next.children), []).map(v => {
      // v.account = 0;
      this.$set(v, "account", 0);
      return v;
    });
    let initParams = {
      startIndex: -1, // 初始位置
      endIndex: this.friutData.length - 1, // 结束位置
      time: 2, // 运动次数
      targetNumber: this.getRamdon(0, this.friutData.length) // 运动结束后的下标
    };
    console.log(initParams);
    // this.initMove(initParams);
  }
};
</script>

<style lang="scss" scoped>
.friutGame-wrapper{
  width: 350px;
  height: 350px;
  position: relative;
  /* margin:0 auto; */
  padding-top: 20px;
  float: left;
  margin-right: 100px;
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
.pay-area{
  width: 400px;
  float: left;
}
.calc-area{
  display: flex;
  padding:10px;
  .calc-area-item {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
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