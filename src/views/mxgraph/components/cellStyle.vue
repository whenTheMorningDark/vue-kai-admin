<template>
  <div class="cellStyle">
    <Item label="图形宽度">
      <template slot="right">
        <el-input-number
          v-model="width"
          size="mini"
          :min="1"
          @change="changeOptions('width',width)"
        />
      </template>
    </Item>
    <Item label="图形高度">
      <template slot="right">
        <el-input-number
          v-model="height"
          size="mini"
          :min="1"
          @change="changeOptions('height',height)"
        />
      </template>
    </Item>
    <Item label="图形背景颜色">
      <template slot="right">
        <el-color-picker
          v-model="styleOptions.fillColor"
          @change="changeOptions('fillColor',styleOptions.fillColor)"
        />
      </template>
    </Item>
    <Item label="边框颜色">
      <template slot="right">
        <el-color-picker
          v-model="styleOptions.strokeColor"
          @change="changeOptions('strokeColor',styleOptions.strokeColor)"
        />
      </template>
    </Item>

    <Item label="边框样式">
      <template slot="right">
        <el-select
          v-model="value"
          placeholder="请选择"
          size="mini"
          @change="changeOptions('dashed',value)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </Item>

    <Item label="边框粗细">
      <template slot="right">
        <el-input-number
          v-model="num"
          size="mini"
          :min="1"
          @change="changeOptions('strokeWidth',num)"
        />
      </template>
    </Item>

    <Item label="透明度">
      <template slot="right">
        <el-input-number
          v-model="opacity"
          size="mini"
          :min="0"
          :max="100"
          :step="10"
          @change="changeOptions('opacity',opacity)"
        />
      </template>
    </Item>
  </div>
</template>
<script>
import Item from './Item'
export default {
  name: 'CellStyle',
  inject: ['root'],
  components: {
    Item
  },
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
      opacity: 0,
      width: 1,
      height: 1
    }
  },
  created () {
    if (Object.keys(this.root.styleOptions).length === 0) {
      this.styleOptions = {}
    } else {
      const { width, height } = this.root.currentCell.geometry
      this.styleOptions = Object.assign(this.styleOptions, this.root.styleOptions)
      this.value = this.styleOptions.dashed || '0'
      this.num = this.styleOptions.strokeWidth || 1
      this.opacity = this.styleOptions.opacity || 100
      this.width = width || 0
      this.height = height || 0
    }
  },
  methods: {
    changeOptions (key, value) {
      this.$emit('styleChange', { key, value })
    }
  }
}
</script>

