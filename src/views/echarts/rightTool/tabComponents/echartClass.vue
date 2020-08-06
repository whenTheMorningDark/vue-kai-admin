<template>
  <div class="echartClass">
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item
        v-for="item in collapseData"
        :key="item.name"
        :title="item.title"
        :name="item.name"
      >
        <component :is="item.type" @change="changeFun" :ref="item.ref"></component>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import baseAttr from "../components/baseAttr";
import titleComponents from "../components/titleComponents";
import legendComponents from "../components/legendComponents";
import xComponents from "../components/xComponents";
import yComponents from "../components/yComponents";
import { mapGetters } from "vuex";
export default {
  name: "echartClass",
  inject: ["root"],
  data () {
    return {
      activeNames: ["1"],
      timer: null,
      currentId: "",
      collapseData: [
        { name: "1", title: "基本属性", type: baseAttr, ref: "baseAttr", },
        { name: "2", title: "标题组件", type: titleComponents, ref: "titleComponents" },
        { name: "3", title: "图例组件", type: legendComponents, ref: "legendComponents" },
        { name: "4", title: "x轴组件", type: xComponents, ref: "xComponents" },
        { name: "5", title: "y轴组件", type: yComponents, ref: "yComponents" }
      ]
    };
  },
  computed: {
    ...mapGetters(["currentTarget"])
  },
  components: {
    baseAttr,
    titleComponents,
    legendComponents,
    xComponents,
    yComponents
  },
  watch: {
    currentTarget: {
      deep: true,
      handler (nVal) {
        // if (Object.keys(nVal).length === 0) {
        //   return;
        // }
        console.log("出发");
        this.$nextTick(() => {
          this.$refs.baseAttr[0].setData(nVal);
          let mapComponent = {
            titleComponents: "title",
            legendComponents: "legend",
            xComponents: "xAxis",
            yComponents: "yAxis"
          };
          for (let key in mapComponent) {
            this.setData(nVal, key, mapComponent[key]);
          }
        });
      }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val);
    },
    // 设置数据
    setData (data, key, value) {
      if (Object.keys(data).length === 0) {
        this.$refs[key][0].setData(data);
      } else {
        let targetObject = data.optionsData[value];

        this.$refs[key][0].setData(targetObject);
      }
    },
    // // 修改图例的值
    // changeLegendDataFun ({ type, value }) {
    //   this.$store.commit("echart/changeCurrentTagetOptions", { attr: "legend", key: type, value: value });
    // },
    // // 修改x轴的值
    // changexDataFun ({ type, value }) {
    //   this.$store.commit("echart/changeCurrentTagetOptions", { attr: "xAxis", key: type, value: value });
    // },
    changeFun ({ attr, type, value }) {
      if (attr === "baseAttr") {
        this.changeBaseAttrFun(type, value);
      } else {
        this.changeDataFun({ attr, type, value });
      }
    },
    // 改变标题组件的值
    changeDataFun ({ attr, type, value }) {
      this.$store.commit("echart/changeCurrentTagetOptions", { attr, key: type, value: value });
    },
    // 改变基础属性的回调
    changeBaseAttrFun (type, value) {
      this.$store.commit("echart/changeCurrentTagetAttr", { key: type, value: value });
      let widthHeightArr = ["width", "height"];
      let xYArr = ["x", "y"];
      if (widthHeightArr.includes(type)) {
        this.root.onResize();
      } else if (xYArr.includes(type)) {
        this.root.onDragFun();
      }
    }

  }
};
</script>

<style>
</style>