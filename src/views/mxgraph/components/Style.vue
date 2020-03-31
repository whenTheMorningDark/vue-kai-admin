<template>
  <div v-if="Object.keys(styleOptions).length>0"
       class="style">
    <div class="item">
      <div class="item-label">
        图形背景颜色
      </div>
      <div class="item-con">
        <el-color-picker v-model="styleOptions.fillColor"
                         @change="changeOptions('fillColor',styleOptions.fillColor)" />
      </div>
    </div>
    <div class="item">
      <div class="item-label">
        边框颜色
      </div>
      <div class="item-con">
        <el-color-picker v-model="styleOptions.strokeColor"
                         @change="changeOptions('strokeColor',styleOptions.strokeColor)" />
      </div>
    </div>
    <div class="item">
      <div class="item-label">
        边框样式
      </div>
      <div class="item-con">
        <el-select v-model="value"
                   placeholder="请选择"
                   size="mini"
                   @change="changeOptions('dashed',value)">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
      </div>
    </div>
    <div class="item">
      <div class="item-label">
        边框粗细
      </div>
      <div class="item-con">
        <el-input-number v-model="num"
                         size="mini"
                         :min="1"
                         @change="changeOptions('strokeWidth',num)" />
      </div>
    </div>
    <div class="item">
      <div class="item-label">
        透明度
      </div>
      <div class="item-con">
        <el-input-number v-model="opacity"
                         size="mini"
                         :min="0"
                         :max="100"
                         :step="10"
                         @change="changeOptions('opacity',opacity)" />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable space-before-function-paren */
export default {
  name: 'Style',
  inject: ['root'],
  data () {
    return {
      styleOptions: {},
      options: [{
        value: '0',
        label: '实线'
      }, {
        value: '1',
        label: '虚线'
      }],
      value: '0',
      num: 1,
      opacity: 0
    }
  },

  created () {
    // console.log(this.root)
    if (Object.keys(this.root.styleOptions).length === 0) {
      this.styleOptions = {}
    } else {
      this.styleOptions = Object.assign(this.styleOptions, this.root.styleOptions)
      this.value = this.styleOptions.dashed || '0'
      this.num = this.styleOptions.strokeWidth || 1
      this.opacity = this.styleOptions.opacity || 100
    }

    console.log(this.styleOptions)
    // console.log(this.root.styleOptions)
    // console.log(this.styleOptions)
    // this.$parent.setStyleOptions()
  },
  methods: {
    changeOptions (key, value) {
      this.$emit('styleChange', { key, value })
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  padding: 25px 5px;
  height: 28px;
  align-items: center;
  .item-label {
    flex: 1;
    font-size: 14px;
  }
  .item-con {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /deep/ .el-color-picker {
      height: 28px;
      .el-color-picker__trigger {
        height: 100%;
      }
    }
  }
}
</style>
