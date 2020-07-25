<template>
  <div class="echartClass">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基本属性" name="1">
        <baseAttr ref="baseAttr" @change="changeBaseAttrFun"></baseAttr>
      </el-collapse-item>
      <el-collapse-item title="标题组件" name="2">
        <titleComponents ref="titleComponents"></titleComponents>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import baseAttr from "../components/baseAttr";
import titleComponents from "../components/titleComponents";
import { mapGetters } from "vuex";
import { defaultTtileKeys } from "../components/commonData/commonData";
import { isUndefined } from "@/utils/common";
export default {
  name: "echartClass",
  inject: ["root"],
  data () {
    return {
      activeNames: ["1"],
      timer: null
    };
  },
  computed: {
    ...mapGetters(["currentTarget"])
  },
  components: {
    baseAttr,
    titleComponents
  },
  watch: {
    currentTarget: {
      deep: true,
      handler (nVal) {
        if (Object.keys(nVal).length === 0) {
          return;
        }
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
    },
    // 设置标题的值
    setTitleData (data) {
      let targetObject = data.optionsData.title;
      if (isUndefined(targetObject)) {
        data.optionsData.title = this.initTitleOption(); // 初始化title
      } else {
        if (targetObject.text && targetObject.text.length > 0) {
          this.$set(targetObject, "show", true);
        } else {
          this.$set(targetObject, "show", false);
        }
      }
      this.$refs.titleComponents.setData(targetObject);
    },
    // 初始化title的值
    initTitleOption () {
      let data = {};
      Object.keys(defaultTtileKeys).forEach(v => {
        let needBool = ["show"];
        if (needBool.includes(v)) {
          this.$set(data, v, false);
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
    }
  }
};
</script>

<style>
</style>