<template>
  <div class="style">
    <component :is="cStyleComponet" @styleChange="changeOptions" />
  </div>
</template>
<script>
/* eslint-disable space-before-function-paren */
import cellStyle from './cellStyle'
import edgeStyle from './edgeStyle'
import noInfo from './noInfo'
export default {
  name: 'Style',
  inject: ['root'],
  components: {
    cellStyle,
    edgeStyle,
    noInfo
  },
  computed: {
    cStyleComponet () {
      const currentCell = this.root.currentCell
      if (currentCell.vertex) {
        return cellStyle
      } else if (currentCell.edge) {
        return edgeStyle
      }
      return noInfo
    }
  },
  methods: {
    changeOptions ({ key, value }) {
      this.$emit('styleChange', { key, value })
    }
  }
}
</script>

