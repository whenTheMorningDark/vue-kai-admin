<template>
  <div class="echarts-wrapper">
    <div class="left-container">
      <toolbar :rightBtn="rightBtn"></toolbar>
      <div class="add-wrapper" @drop="drop" @dragover="allowDrop" ref="addWrapper">
        <resizeBox
          :item="item"
          v-for="item in resizeBox"
          :key="item.id"
          @onResize="onResize"
          @delFun="delFun"
          @onDrag="onDragFun"
          @handleContextmenu="handleContextmenu"
          @onActivated="onActivated"
        >
          <echartTemplate :id="item.id" ref="echartComponent" :optionsData="item.optionsData"></echartTemplate>
        </resizeBox>
      </div>
    </div>
    <div class="right-container">
      <rightTool></rightTool>
    </div>
  </div>
</template>
<script>
import toolbar from "./components/toolBar";
import echartTemplate from "./echartComponent/echartTemplate";
import resizeBox from "./components/resizeBox";
import { randomStr } from "@/utils";
import rightTool from "./rightTool/index";
import History from "./utils/history";
import event from "./utils/event";
export default {
  name: "echarts",
  mixins: [event],
  components: {
    toolbar,
    echartTemplate,
    resizeBox,
    rightTool
  },
  provide () {
    return {
      root: this
    };
  },
  data () {
    return {
      resizeBox: [],
      currentId: "", // 当前操作的id
      targetEchart: null, // 当前操作的echart对象
      stack: new History(), // 历史记录栈对象
      rightBtn: [ // toolbar右侧按钮
        { text: "回撤", icon: "el-icon-refresh-right", func: this.cancelFun },
        { text: "前进", icon: "el-icon-refresh-left", func: this.uncancel },
        { text: "全选", icon: "el-icon-crop", func: this.selectAllFun }
      ],
      flag: false,
      currentItem: {} // 当前的对象
    };
  },
  methods: {
    allowDrop (ev) {
      ev.preventDefault();
    },
    async drop (ev) {
      let ele = this.$refs.addWrapper;
      let elex = ele.getBoundingClientRect().x;
      let eley = ele.getBoundingClientRect().y;
      let { x, y } = ev;
      let uid = randomStr(8);
      ev.preventDefault();
      var data = JSON.parse(ev.dataTransfer.getData("data"));
      let styleOption = { x: x - elex, y: y - eley, id: uid, optionsData: data.optionsData };
      let boxOptions = Object.assign({ x: 0, y: 0, width: 300, height: 300 }, styleOption);
      let id = await this.createEchart(boxOptions);

      let targetEchart = this.$refs.echartComponent.find(v => v.id === id);
      targetEchart.resizeFun();
    },
    createEchart (boxOptions) {
      return new Promise((resolve => {
        this.resizeBox.push({
          ...boxOptions,
          active: false
        });
        // console.log(this.stack);
        this.stack.setState(this.resizeBox); // 设置历史记录
        resolve(boxOptions.id);
      }));
    },
    onResize (data) { // 处理resize变化后的图形
      this.$nextTick(() => {
        if (!data || Object.keys(data).length === 0) {
          data = this.currentItem;
        }
        if (this.currentId.length === 0 || this.currentId !== data.id || this.targetEchart === null) {
          this.currentId = data.id;
          this.targetEchart = this.$refs.echartComponent.find(v => v.id === data.id);
        }
        this.targetEchart.resizeFun();
        this.stack.setState(this.resizeBox); // 设置历史记录
        // this.$store.commit("echart/setCurrentTarget", data);
      });
    },
    // 处理拖拽后的图形
    onDragFun (data) {
      console.log(data);
      this.stack.setState(this.resizeBox); // 设置历史记录
      // this.$store.commit("echart/setCurrentTarget", data);
    },
    // 选中元素
    onActivated (data) {
      console.log(data);
      this.currentItem = data;
      this.$store.commit("echart/setCurrentTarget", data);
    },
    // 删除的方法
    delFun (item) {
      this.resizeBox = this.resizeBox.filter(v => v.id !== item.id);
      this.currentItem = {};
      this.$store.commit("echart/setCurrentTarget", this.currentItem);
      this.stack.setState(this.resizeBox); // 设置历史记录
    },
    // 处理前进和撤销共同方法
    commCancelGoFun (replaceArr) {
      this.currentId = "";
      if (replaceArr && replaceArr.length >= 0) {
        this.resizeBox = replaceArr;
        this.$nextTick(() => {
          this.$refs.echartComponent.forEach(v => {
            v.resizeFun();
          });
        });
      }
    },
    // 撤销方法
    cancelFun () {
      let replaceArr = this.stack.replaceState();
      this.commCancelGoFun(replaceArr);
    },
    // 前进方法
    uncancel () {
      let replaceArr = this.stack.unReplaceState();
      this.commCancelGoFun(replaceArr);
    },
    // 菜单事件
    handleContextmenu (item) {
      this.currentItem = item;
      let filterArr = this.resizeBox.filter(v => v.id !== this.currentItem.id);
      filterArr.forEach(v => {
        this.$set(v, "active", false);
      });
      let target = this.resizeBox.find(v => v.id === item.id) || {};
      this.$set(target, "active", true);
      this.$store.commit("echart/setCurrentTarget", this.currentItem);
    },
    // 全选
    selectAllFun () {
      this.flag = !this.flag;
      this.resizeBox.forEach(v => {
        this.$set(v, "active", false);
      });
      console.log(this.resizeBox);
    },
    // 点击addWrapper状态都为false,点击当前resizeBox的active则为true,其它为false
    addWrapperMouseDownFun (e) { // 点击是图形的情况
      if (e.target.tagName === "CANVAS") {
        let filterArr = this.resizeBox.filter(v => v.id !== this.currentItem.id);
        filterArr.forEach(v => {
          this.$set(v, "active", false);
        });
        this.$store.commit("echart/setCurrentTarget", this.currentItem);
      } else { // 只是点击空白addWrapper的情况
        this.resizeBox.forEach(v => {
          this.$set(v, "active", false);
        });
        this.currentItem = {};
        this.$store.commit("echart/setCurrentTarget", this.currentItem);
      }
    }
  },
  mounted () {
    this.stack.setState(this.resizeBox);
    let el = this.$refs.addWrapper;
    el.addEventListener("mousedown", this.addWrapperMouseDownFun);
  },
  destroyed () {
    let el = this.$refs.addWrapper;
    el.removeEventListener("mousedown", this.addWrapperMouseDownFun);
  }
};
</script>
<style lang="scss" scoped>
.echarts-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .left-container {
    width: calc(100% - 280px);
    height: 100%;
    margin-right: 20px;
    .add-wrapper {
      // width: 220px;
      width: 100%;
      height: calc(100% - 30px);
      position: relative;
    }
  }
  .right-container {
    width: 300px;
    height: 100%;
  }
}
</style>