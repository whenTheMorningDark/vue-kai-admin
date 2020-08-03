<template>
  <div class="echartClass">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基本属性" name="1">
        <baseAttr ref="baseAttr" @change="changeBaseAttrFun"></baseAttr>
      </el-collapse-item>
      <el-collapse-item title="标题组件" name="2">
        <titleComponents ref="titleComponents" @change="changeTitleDataFun"></titleComponents>
      </el-collapse-item>
      <el-collapse-item title="图例组件" name="3">
        <legendComponents ref="legendComponents" @change="changeLegendDataFun"></legendComponents>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import baseAttr from "../components/baseAttr";
import titleComponents from "../components/titleComponents";
import legendComponents from "../components/legendComponents";
import { mapGetters } from "vuex";
import { defaultTtileKeys } from "../components/commonData/commonData";
import { isUndefined } from "@/utils/common";
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
    legendComponents
  },
  watch: {
    currentTarget: {
      deep: true,
      handler (nVal) {
        // if (Object.keys(nVal).length === 0) {
        //   return;
        // }
        console.log("出发");
        this.setData(nVal);
      }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val);
    },
    // 设置数据
    setData (data) {
      this.$refs.baseAttr.setData(data);
      this.setTitleData(data);
      this.setlegendData(data);
    },
    // 设置图例的值
    setlegendData (data) {
      if (Object.keys(data).length === 0) {
        this.$refs.legendComponents.setData(data);
      } else {
        let targetObject = data.optionsData.legend;
        this.$refs.legendComponents.setData(targetObject);
      }
    },
    // 设置标题的值
    setTitleData (data) {
      console.log(data);
      if (Object.keys(data).length === 0) {
        this.$refs.titleComponents.setData(data);
      } else {
        let targetObject = data.optionsData.title;
        if (isUndefined(targetObject.show)) {
          if (targetObject.text && targetObject.text.length > 0) {
            this.$set(targetObject, "show", true);
          } else {
            this.$set(targetObject, "show", false);
          }
        } else {
          this.$set(targetObject, "show", targetObject.show);
        }
        if (isUndefined(targetObject)) {
          data.optionsData.title = this.initTitleOption(); // 初始化title
        } else {
          let targetKeys = Object.keys(targetObject);
          let defaultKeys = Object.keys(defaultTtileKeys);
          let notKeys = defaultKeys.filter(v => !targetKeys.includes(v));
          notKeys.forEach(v => {
            if (isUndefined(targetObject[v])) {
              this.$set(targetObject, v, defaultTtileKeys[v]);
            }
          });
        }
        console.log(targetObject);
        this.$refs.titleComponents.setData(targetObject);
      }

    },
    // 修改图例的值
    changeLegendDataFun ({ type, value }) {
      console.log(type, value);
      this.$store.commit("echart/changeCurrentTagetOptions", { attr: "legend", key: type, value: value });
      // let paddingArr = {
      //   paddingTop: 0,
      //   paddingRight: 1,
      //   paddingBottom: 2,
      //   paddingLeft: 3,
      // };
      // if (Object.keys(paddingArr).includes(type)) {

      //   this.$store.commit("echart/changeCurrentTagetOptions", { attr: "legend", key: "padding", value: value });
      // } else {
      //   this.$store.commit("echart/changeCurrentTagetOptions", { attr: "legend", key: type, value: value });
      // }
    },
    // 初始化title的值
    initTitleOption () {
      let data = {};
      Object.keys(defaultTtileKeys).forEach(v => {
        let needBool = ["show"];
        let needObject = ["textStyle"];
        if (needBool.includes(v)) {
          this.$set(data, v, false);
        } else if (needObject.includes(v)) {
          let needObjectArr = Object.keys(needObject);
          if (needObjectArr.length > 0) {
            needObjectArr.forEach(s => {
              this.$set(v, s, "");
            });
          } else {
            this.$set(data, v, {});
          }
        } else {
          this.$set(data, v, "");
        }
      });
      return data;
    },
    // 改变基础属性的回调
    changeBaseAttrFun (item) {
      console.log(item);
      this.$store.commit("echart/changeCurrentTagetAttr", { key: item.type, value: item.value });
      let widthHeightArr = ["width", "height"];
      let xYArr = ["x", "y"];
      if (widthHeightArr.includes(item.type)) {
        this.root.onResize();
      } else if (xYArr.includes(item.type)) {
        this.root.onDragFun();
      }
    },
    // 改变标题组件的值
    changeTitleDataFun ({ type, value }) {
      console.log(type, value);
      this.$store.commit("echart/changeCurrentTagetOptions", { attr: "title", key: type, value: value });
    }
  }
};
</script>

<style>
</style>