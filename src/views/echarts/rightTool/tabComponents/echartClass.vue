<template>
  <div class="echartClass">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基本属性" name="1">
        <baseAttr ref="baseAttr" @change="changeBaseAttrFun"></baseAttr>
      </el-collapse-item>
      <el-collapse-item title="标题组件" name="2">
        <titleComponents ref="titleComponents" @change="changeDataFun"></titleComponents>
      </el-collapse-item>
      <el-collapse-item title="图例组件" name="3">
        <legendComponents ref="legendComponents" @change="changeDataFun"></legendComponents>
      </el-collapse-item>
      <el-collapse-item title="x轴组件" name="4">
        <xComponents ref="xComponents" @change="changeDataFun"></xComponents>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import baseAttr from "../components/baseAttr";
import titleComponents from "../components/titleComponents";
import legendComponents from "../components/legendComponents";
import xComponents from "../components/xComponents";
import { mapGetters } from "vuex";
export default {
  name: "echartClass",
  inject: ["root"],
  data () {
    return {
      activeNames: ["1"],
      timer: null,
      currentId: ""
    };
  },
  computed: {
    ...mapGetters(["currentTarget"])
  },
  components: {
    baseAttr,
    titleComponents,
    legendComponents,
    xComponents
  },
  watch: {
    currentTarget: {
      deep: true,
      handler (nVal) {
        // if (Object.keys(nVal).length === 0) {
        //   return;
        // }
        console.log("出发");
        this.$refs.baseAttr.setData(nVal);
        let mapComponent = {
          titleComponents: "title",
          legendComponents: "legend",
          xComponents: "xAxis"
        };
        for (let key in mapComponent) {
          this.setData(nVal, key, mapComponent[key]);
        }
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
        this.$refs[key].setData(data);
      } else {
        let targetObject = data.optionsData[value];
        this.$refs[key].setData(targetObject);
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
    // 改变标题组件的值
    changeDataFun ({ attr, type, value }) {
      this.$store.commit("echart/changeCurrentTagetOptions", { attr, key: type, value: value });
    },
    // 改变基础属性的回调
    changeBaseAttrFun (item) {
      this.$store.commit("echart/changeCurrentTagetAttr", { key: item.type, value: item.value });
      let widthHeightArr = ["width", "height"];
      let xYArr = ["x", "y"];
      if (widthHeightArr.includes(item.type)) {
        this.root.onResize();
      } else if (xYArr.includes(item.type)) {
        this.root.onDragFun();
      }
    }

  }
};
</script>

<style>
</style>