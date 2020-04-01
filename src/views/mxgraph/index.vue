<template>
  <div class="mxgraph_container">
    <el-button @click="getData">在控制台看获取的json数据</el-button>
    <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%">
      <el-row>
        <el-col :span="20">
          <mxGraphComponent
            v-if="graphData.length > 0"
            ref="mxGraph"
            :tool-bar-icon="toolBarIcon"
            :graph-data="graphData"
            :rules="rules"
            @clickToolBar="clickToolBar"
            @click="clickGraphFun"
          />
        </el-col>
        <el-col :span="4">
          <rightSetting :key="currentCell.id" @styleChange="styleChange" />
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */
import mxGraphComponent from '@/components/mxGraph'
import rightSetting from './rightSetting'
const rhombus = require('@/assets/images/rhombus.gif')
const ellipse = require('@/assets/images/ellipse.gif')
const rounded = require('@/assets/images/rounded.gif')
const del = require('@/assets/images/del.png')
export default {
  name: 'MxgraphContainer',
  provide () {
    return {
      root: this
    }
  },
  components: {
    mxGraphComponent,
    rightSetting
  },
  // rhombus
  data () {
    return {
      toolBarIcon: [
        { styleOptions: { shape: 'rhombus' }, width: 100, height: 40, value: '菱形', iconSrc: rhombus, options: { name: 'kafei', type: 'rhombus' }, type: 'draggble' },
        { styleOptions: { shape: 'rounded' }, width: 100, height: 40, value: '矩形', iconSrc: rounded, type: 'draggble', options: { name: 'kafei', type: 'rounded' } },
        { styleOptions: { shape: 'ellipse' }, width: 40, height: 40, value: '圆形', iconSrc: ellipse, type: 'draggble', options: { name: 'kafei', type: 'ellipse' } },
        { iconSrc: del, type: 'click' }
      ],
      graphData: [
        { id: '5', value: '开始', styleOptions: { shape: 'rhombus', strokeColor: '#662B2B', dashed: '0', strokeWidth: 1 }, x: 100, y: 100, width: 100, height: 100, to: [{ id: '7', style: { strokeColor: 'red', edgeStyle: 'orthogonalEdgeStyle', rounded: 0, orthogonalLoop: 1 } }, { id: '9' }], options: { name: 'add', type: 'start' } },
        { id: '7', value: '结束1', styleOptions: { shape: 'rounded', strokeColor: '#740F9F', dashed: '0', strokeWidth: 2 }, x: 500, y: 400, width: 100, height: 100, to: [], options: { name: 'add', type: 'rounded' } },
        { id: '9', value: '结束2', styleOptions: { shape: 'ellipse', strokeColor: '#3C00FF', fillColor: '#1EFF00', dashed: '1', strokeWidth: 3 }, x: 600, y: 500, width: 100, height: 100, to: [], options: { name: 'add', type: 'ellipse' } }
      ],
      styleOptions: {},
      mathKey: 2,
      currentCell: {}
    }
  },
  methods: {
    styleChange ({ key, value }) {
      this.currentCell.styleOptions[key] = value
      this.currentCell.style = this.$refs.mxGraph.convertStyleToString(this.currentCell.styleOptions)
      this.$refs.mxGraph.refreshCell(this.currentCell)
    },
    clickGraphFun (cell) {
      this.currentCell = cell
      console.log(cell)
      this.styleOptions = {}
      // const currentGraphData = this.graphData.find(v => v.id === this.currentCell.id)
      if (Object.keys(cell).length === 0) {
        this.styleOptions = {}
      } else {
        this.styleOptions = Object.assign(this.styleOptions, cell.styleOptions)
      }
      console.log(this.styleOptions)
    },
    getData () {
      console.log(this.$refs.mxGraph.getGrapthData())
    },
    clickToolBar (v) {
      console.log(v)
      // const cell = this.$refs.mxGraph.getSelectionCells()
      this.$confirm('此操作将永久删除该图形, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.mxGraph.removeFun()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    rules (source, target) {
      if (!source.options || !target.options) {
        return false
      }
      const sType = source.options.type
      const tType = target.options.type
      const sourceTo = source.to
      const tTargetId = target.id
      const isHaveTargetId = sourceTo.some(v => v.id === tTargetId)

      if (isHaveTargetId) {
        return false
      }
      if (sType === 'start' && tType === 'rounded') {
        return false
      }
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mxgraph_container {
  width: 100%;
  height: 100%;
}
</style>
