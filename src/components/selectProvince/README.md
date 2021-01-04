**业务背景**
在我业务需求中,需要有个省份区城市联动的组件，并且该组件的开发也是基于 elementUi 原有的效果上面去。在原有的 elementui 库中并没有这样的组件，所以也只能自己手写一个，效果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210104104621735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09ubHlfcnVpd2Vu,size_16,color_FFFFFF,t_70)
**需求分析** 1.需要包含国内的省份，省份下面所对应的城市，城市下方所对应的区，街道不做要求。 2.需要配置每个下拉列表是否可以选择状态，这个是需要更加具体场景进行分析，需要对外提高可控制列表是否可以选择。例如：一层选择了**广东省**后，某些场景**广州市**不能够被选择到。

**基础组件选择**

基础组件还是还是采用 el-select 作为基础模板，进行二次开发，基本 vue 结构如下：

```javascript
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
```

对于每个省份，城市和地区，我们都有一份 json 数据来进行维护，具体数据地址可参考[数据地址](https://github.com/whenTheMorningDark/vue-kai-admin/blob/master/src/components/selectProvince/districts.js)

**确定对外接受参数和对外暴露事件**

```javascript
props: {
    width: { // 外围容器的宽度
      type: [String, Number],
      default: "100%"
    },
    size: { // select的大小
      type: String,
      default: "small"
    },
    defaultProvince: { // 默认的省份
      type: [String, Number],
      default: ""
    },
    defaultCity: { // 默认的城市
      type: [String, Number],
      default: ""
    },
    defaultArea: { // 默认的地区
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
```

**业务代码编写**

由于我们省份，城市和地区的参数都是为一些特殊的数字，在编写业务的过程中，我们往往会忘记某个城市所对应的编号，所以我们有可能需要通过中文来进行逻辑判断。

```javascript
// 判断是否是中文
    isChineseChar(str) {
      var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      return reg.test(str);
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
```

另外每次下拉框值的改变，我们都需要对外暴露出当前的 label 和 value 以供给业务使用，

```javascript
// 获取key-value
    getMapKeyValue(options, code) {
      return {
        label: this.getOptionsLabel(options, code),
        value: code
      };
    },
```

参数说明:
参数 | 类型
-------- | -----
defaultProvince| 【String,number】默认省份为空
defaultCity| 【String,number】默认城市为空
defaultArea | 【String,number】默认地区为空
disableProvinceOptions| 【Array】默认省份下拉项目不可编辑
disableCityOptions| 【Array】默认城市下拉项目不可编辑
disableAreaOptions| 【Array】默认地区下拉项目不可编辑
size| 【String】默认下拉框大小为 small
provinceDisabled| 【Boolean】默认省份下拉框是否可以编辑
cityDisabled| 【String】默认城市下拉框是否可以编辑
areaDisable| 【String】默认地区下拉框是否可以编辑

**事件说明**
|事件|说明
|--|--|
| province | 省份选择的回调 val={value:"",label:""} |
| city| 城市选择的回调 val={value:"",label:""} |
| area| 地区选择的回调 val={value:"",label:""} |

**方法说明**
|方法|说明 |
|--|--|
| getSelectData | 获取当前下拉选择的数据 |
| setOptionsDisabled| 设置下拉项目是否可选 参数 1:type:"city area province".参数 2：Array:[] 不可选择的项的 code 或者中文

**地址**
完整源码地址在[组件地址](https://github.com/whenTheMorningDark/vue-kai-admin/blob/master/src/components/selectProvince/index.vue)
