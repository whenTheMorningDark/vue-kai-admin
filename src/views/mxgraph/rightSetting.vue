<template>
  <div class="rightSetting">
    <Tabs :tabs-data="tabsData" :default-value="defaultValue" @tab-click="itemClick" />
    <div class="tabCon">
      <component :is="componentName" :style-options="styleOptions" @styleChange="styleChange" />
    </div>
  </div>
</template>
<script>
/* eslint-disable space-before-function-paren */
import Tabs from './tabs'
import { Arrange, Style, TextStyle } from './components/index'
export default {
  name: 'RightSetting',
  components: {
    Tabs,
    Arrange,
    Style,
    TextStyle
  },
  props: {
    styleOptions: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      activeName: 'first',
      tabsData: [
        { text: '图形样式', label: 'Style' },
        { text: '字体样式', label: 'TextStyle' },
        { text: '额外属性', label: 'Arrange' }
      ],
      IscomponentName: 'Style',
      defaultValue: '图形样式'
    }
  },
  computed: {
    componentName () {
      const map = {
        Arrange,
        Style,
        TextStyle
      }
      return map[this.IscomponentName]
    }
  },
  methods: {
    itemClick (item) {
      console.log(item)
      this.IscomponentName = item.label
    },
    styleChange ({ key, value }) {
      this.$emit('styleChange', { key, value })
    }
  }
}
</script>
<style lang="scss" scoped>
.rightSetting {
  height: calc(100vh - 50px);
  background-color: #304156;
  color: #ffffff;
}
</style>
