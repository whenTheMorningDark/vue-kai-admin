<template>
  <div class="a">
    <span>a</span>
    <el-button @click="getData">获取</el-button>
    <B ref="b" :is-check-mutile="isCheckMutile">
      <template slot="header">
        <el-row>
          <el-col :span="10">
            <el-input v-model="searchText" size="mini" />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="searchFun">搜索</el-button>
          </el-col>
        </el-row>
      </template>
    </B>
  </div>
</template>

<script>
import B from './b'
export default {
  name: 'A',
  components: {
    B
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    array: {
      type: Array,
      default: () => []
    },
    object: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      isCheckMutile: false,
      searchText: '',
      treeData: [
        {
          id: 1, text: 'text1', children: [
            { id: 2, text: 'text1-1', children: [], pId: 1 },
            { id: 3, text: 'text1-2', children: [], pId: 1 }
          ]
        },
        {
          id: 4, text: 'text4', children: [
            { id: 5, text: 'text5', children: [] }
          ]
        }
      ]
    }
  },
  computed: {
    cUserName () {
      return this.name
    }
  },
  mounted () {
    const childrenNode = {
      id: 6,
      text: 'text6-1',
      children: []
    }
    this.addTreeData(this.treeData, 1, childrenNode)
    this.delTreeData(this.treeData, 2)
    // this.delTreeData(this.treeData, 4)
    this.setTreeDataValue(this.treeData, 4, 'text', '777')
    console.log(this.treeData)
    console.log(this.getTreeData(this.treeData, 5))
    // console.log(this.getTreeData(this.treeData, 1))
    // console.log(this.getTreeData(this.treeData, 2))
  },
  methods: {
    getData () {
      console.log(this.$refs.b.getCheckedNodesFun())
    },
    searchFun () {
      this.$refs.b.setCheckedKeysFun({ label: this.searchText })
    },
    // 修改某个树节点的属性
    setTreeDataValue (treeData, currentNodeId, key, value) {
      const currentNode = this.getTreeData(treeData, currentNodeId)
      if (!currentNode) {
        return
      }
      // currentNode[key] = value
      this.$set(currentNode, key, value)
    },
    // 添加树结构的数据
    addTreeData (treeData, currentNodeId, data) {
      const currentNode = this.getTreeData(treeData, currentNodeId)
      if (!currentNode) {
        return
      }
      if (!currentNode.children) {
        currentNode.children = []
      }
      currentNode.children.push(data)
    },
    // 删除树结构数据
    delTreeData (treeData, currentNodeId) {
      const currentNode = this.getTreeData(treeData, currentNodeId)
      if (!currentNode) {
        return
      }
      let arr = []
      if (!currentNode.pId || currentNode.pId.length === 0) {
        arr = treeData
      } else {
        const parentNode = this.getTreeData(treeData, currentNode.pId)
        arr = parentNode.children
      }
      const index = arr.findIndex((v) => v.id === currentNodeId)
      arr.splice(index, 1)
    },
    // 删除某个树的节点
    getTreeData (treeData, id) {
      // todo ...
      // 广度遍历
      if (!treeData || treeData.length === 0) {
        return
      }
      let stack = []
      let item = null
      treeData.forEach(v => {
        stack.push(v)
      })
      while (stack.length) {
        const result = stack.shift()
        if (result.id === id) {
          item = result
          return item
        }
        if (result.children && result.children.length > 0) {
          stack = [...stack, ...result.children]
        }
      }
      return item
    }
  }
}
</script>

<style>
</style>
