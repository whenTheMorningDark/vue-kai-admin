<template>
  <div class="partolTree">
    <slot name="header">header</slot>
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="defaultCheck"
      :default-expand-all="false"
      :props="defaultProps"
      :class="{pdTree:isParentCheck}"
      :check-strictly="true"
      :filter-node-method="filterNode"
      @check-change="checkChangeFun"
    />
  </div>
</template>

<script>
export default {
  props: {
    isParentCheck: {
      type: Boolean,
      default: true
    },
    isCheckMutile: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      data: [{
        id: 1,
        label: '广州1',
        children: [{
          id: 4,
          label: '广州12',
          children: [{
            id: 9,
            label: '广州123'
          }, {
            id: 10,
            label: '广州124'
          }]
        }]
      }, {
        id: 2,
        label: '湖南',
        children: [{
          id: 5,
          label: '湖南1'
        }, {
          id: 6,
          label: '湖南2'
        }]
      }, {
        id: 3,
        label: '湖南2',
        children: [{
          id: 7,
          label: '广州12344'
        }, {
          id: 8,
          label: '广州12344'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultCheck: []
    }
  },
  mounted () {
    // console.log(union(this.sourceArr, this.targetArr))
    // const object = {
    //   a: 1,
    //   b: 2,
    //   c: 3
    // }
    // const { a, ...resetObj } = object // 去取对象的某个属性
    // console.log(a)
    // console.log(resetObj)
    // let a = new Foo() //a.id -> 1
    // let b = new Foo() //b.id -> 2
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    checkChangeFun (data, checked, indeterminate) {
      if (checked && !this.isCheckMutile) {
        const arr = [data.id]
        this.$refs.tree.setCheckedKeys(arr)
      }
    },
    getCheckedNodesFun () {
      return this.$refs.tree.getCheckedNodes()
    },
    setCheckedKeysFun ({ label }) {
      this.defaultCheck = []
      this.$refs.tree.filter(label)
    }
  }
}
</script>

<style lang="scss">
.pdTree {
  .el-tree-node {
    .is-leaf + .el-checkbox .el-checkbox__inner {
      display: inline-block;
    }
    .el-checkbox__input > .el-checkbox__inner {
      display: none;
    }
  }
}
</style>
