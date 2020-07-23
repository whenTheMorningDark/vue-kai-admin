<template>
  <div class="echartClass">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基本属性" name="1">
        <baseAttr ref="baseAttr" @change="changeBaseAttrFun"></baseAttr>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import baseAttr from "../components/baseAttr";
import { mapGetters } from "vuex";
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
    baseAttr
  },
  watch: {
    currentTarget: {
      deep: true,
      handler (nVal) {
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
    },
    // 改变基础属性的回调
    changeBaseAttrFun (item) {
      console.log(item);
      // console.log(this.dispatch("echarts"));
      // console.log(this.root);
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