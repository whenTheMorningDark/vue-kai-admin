<template>
  <div class="selectProvinceWrapper" :style="{width:width+'px'}">
    <el-select
      v-model="province"
      :size="size"
      placeholder="请选择省份"
      clearable
      @change="getCities"
      :disabled="provinceDisabled"
      filterable
    >
      <el-option
        v-for="item in provinceOptions"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>

    <el-select
      v-model="city"
      :size="size"
      placeholder="请选择城市"
      clearable
      @change="getArea"
      :disabled="cityDisabled"
      filterable
    >
      <el-option
        v-for="item in cityOptions"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>

    <el-select
      v-model="area"
      :size="size"
      placeholder="请选择地区"
      clearable
      :disabled="areaDisable"
      @change="areaChange"
      filterable
    >
      <el-option
        v-for="item in areaOptions"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import DISTRICTS from "./districts";
const DEFAULT_CODE = 100000;
export default {
  name: "selectProvince",
  props: {
    width: {
      type: [String, Number],
      default: "100%"
    },
    size: {
      type: String,
      default: "small"
    },
    defaultProvince: {
      type: [String, Number],
      default: ""
    },
    defaultCity: {
      type: [String, Number],
      default: ""
    },
    defaultArea: {
      type: [String, Number],
      default: ""
    },
    provinceDisabled: { // 省份是否可以编辑
      type: Boolean,
      default: false
    },
    disableProvinceOptions: { // 省份的options项目是否可以编辑
      type: Array,
      default: () => []
    },
    cityDisabled: { // 城市是否可以编辑
      type: Boolean,
      default: false
    },
    disableCityOptions: {
      type: Array,
      default: () => []
    },
    areaDisable: { // 地区是否可以编辑
      type: Boolean,
      default: false
    },
    disableAreaOptions: { // 地区是否可以编辑
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      districts: DISTRICTS,
      province: "", // 省
      provinceOptions: [], // 省的options
      city: "", // 城市
      area: "", // 地区
    };
  },
  computed: {
    cityOptions() { // 城市的options
      return this.changeValueKeyToArr(this.getDistrictsFun(this.province));
    },
    areaOptions() { // 地区的options
      return this.changeValueKeyToArr(this.getDistrictsFun(this.city));
    }
  },
  created() {
    this.init();// 初始化方法
  },
  methods: {
    // 判断是否是中文
    isChineseChar(str) {
      var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      return reg.test(str);
    },
    // 初始化方法
    init() {
      let aProvince = this.defaultProvince.toString();
      let aCity = this.defaultCity.toString();
      let aArea = this.defaultArea.toString();
      let provinceObj = this.getDistrictsFun();
      this.provinceOptions = this.changeValueKeyToArr(provinceObj);
      this.province = this.getDefaultValue(this.provinceOptions, aProvince); // 设置省份的初始值
      this.disableProvinceOptions.length > 0 && this.handleDisableProvinceOptions("province", this.disableProvinceOptions); // 处理省份项是否可以编辑
      this.city = this.getDefaultValue(this.cityOptions, aCity); // 设置城市的初始值
      this.disableCityOptions.length > 0 && this.handleDisableProvinceOptions("city", this.disableCityOptions); // 处理城市项是否可以编辑
      this.area = this.getDefaultValue(this.areaOptions, aArea); // 设置地区的默认值
      this.disableAreaOptions.length > 0 && this.handleDisableProvinceOptions("area", this.disableAreaOptions); // 处理地区项是否可以编辑
    },
    // 获取所有的数据
    getSelectData() {
      return {
        province: this.getMapKeyValue(this.provinceOptions, this.province),
        city: this.getMapKeyValue(this.cityOptions, this.city),
        area: this.getMapKeyValue(this.areaOptions, this.area),
      };
    },
    // 处理省份项是否可以编辑
    handleDisableProvinceOptions(type, options) {
      this.setOptionsDisabled(type, options);
    },
    // 设置options的状态
    setOptionsDisabled(type, targetArr = []) {
      if (targetArr.length === 0 || !type) {
        return;
      }
      let map = {
        province: {
          options: this.provinceOptions,
          disabledArr: this.disableProvinceOptions
        },
        city: {
          options: this.cityOptions,
          disabledArr: this.disableCityOptions
        },
        area: {
          options: this.areaOptions,
          disabledArr: this.disableAreaOptions
        }
      };
      targetArr = map[type].disabledArr.concat(targetArr).map(v => {
        v = this.getDefaultValue(map[type].options, v);
        return v;
      }).filter(v => Boolean(v) && v.length > 0);
      if (targetArr.length > 0) {
        map[type].options.map(v => {
          if (targetArr.includes(v.value)) {
            this.$set(v, "disabled", true);
          } else {
            this.$set(v, "disabled", false);
          }
          return v;
        });
      }
    },
    // 获取省市区的默认数组
    getDefaultValue(targetOptions = [], value = "") {
      let targetStr = "";
      if (targetOptions.length === 0 || value.length === 0) {
        return targetStr;
      }
      if (value.length > 0) {
        if (this.isChineseChar(value)) { // 如果是中文的情况
          let targetObj = targetOptions.find(v => v.label === value) || {};
          targetStr = targetObj.value;
        } else {
          targetStr = value;
        }
      }
      return targetStr;
    },
    // 获取label值
    getOptionsLabel(options, code) {
      let target = options.find(v => v.value === code) || {};
      return target.label || "";
    },
    // 获取key-value
    getMapKeyValue(options, code) {
      return {
        label: this.getOptionsLabel(options, code),
        value: code
      };
    },
    // 获取省份
    getDistrictsFun(code = DEFAULT_CODE) {
      return this.districts[code] || [];
    },
    // 获取城市option
    getCities() {
      if (this.provinceDisabled) {
        return;
      }
      this.city = "";
      this.area = "";
      this.$emit("province", this.getMapKeyValue(this.provinceOptions, this.province));
    },
    // 获取地区option
    getArea() {
      if (this.cityDisabled) {
        return;
      }
      this.area = "";
      this.$emit("city", this.getMapKeyValue(this.cityOptions, this.city));
    },
    // 地区发生改变
    areaChange(value) {
      this.$emit("area", this.getMapKeyValue(this.areaOptions, this.area));
    },
    // 把对象key-value转换成为数组
    changeValueKeyToArr(target) {
      let arr = [];
      for (let key in target) {
        let targetObj = {
          label: target[key],
          value: key
        };
        arr.push(targetObj);
      }
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.selectProvinceWrapper{
  padding: 10px;
}
</style>