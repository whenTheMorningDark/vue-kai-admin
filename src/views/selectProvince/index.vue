<template>
  <div>
    <selectProvince
      v-bind="defaultValue"
      ref="selectProvince"
      @province="provinceFun"
      @city="cityFun"
      @area="areaFun"
    />
    <el-button size="small" @click="getData">获取数据</el-button>
  </div>
</template>

<script>
import selectProvince from "@/components/selectProvince";
export default {
  components: {
    selectProvince
  },
  data() {
    return {
      defaultValue: {
        defaultProvince: "广东省",
        defaultCity: "江门市",
        defaultArea: "开平市",
        disableProvinceOptions: ["山东省", "北京市"],
        disableCityOptions: ["广州市", "珠海市"],
        disableAreaOptions: ["蓬江区"]
      }
    };
  },
  methods: {
    provinceFun(value) {
      console.log(value);
      this.$refs.selectProvince.setOptionsDisabled("city", ["深圳市", "北京市"]);
    },
    cityFun(value) {
      console.log(value);
      this.$refs.selectProvince.setOptionsDisabled("area", ["天河区", "白云区"]);
    },
    areaFun(value) {
      console.log(value);
    },
    getData() {
      console.log(this.$refs.selectProvince.getSelectData());
    }
  }
};
</script>

<style>

</style>