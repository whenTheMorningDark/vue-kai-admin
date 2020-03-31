<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>可校验的表格</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="comfire"
      >保存</el-button>
    </div>
    <div>
      <el-form
        ref="ruleForm"
        :model="form"
      >
        <el-table
          :data="form.tableData"
          border
          style="width: 100%"
          max-height="300"
          class="validatorTable"
          @cell-dblclick="changeInput"
        >
          <el-table-column
            v-for="item in colData"
            :key="item.id"
            :prop="item.props"
            :label="item.label"
          >
            <template slot-scope="{row, $index}">
              <el-form-item
                v-if="showEdit[$index][item.props]"
                :prop="'tableData.' + $index + '.'+item.props"
              >
                <el-input
                  v-model="row[item.props]"
                  v-focus
                  size="mini"
                  @blur="inputBlur($index, item.props)"
                />
              </el-form-item>
              <span v-else>{{ row[item.props] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </el-card>
</template>
<script>
/* eslint-disable space-before-function-paren */
export default {
  name: 'ValidatorTable',
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.getElementsByTagName('input')[0].focus()
      }
    }
  },
  data () {
    return {
      colData: [
        { props: 'date', label: '日期', id: 1 },
        { props: 'name', label: '姓名', id: 2 },
        { props: 'address', label: '地址', id: 3 }
      ],
      form: {
        tableData: [{
          date: '2016',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id: 1
        }, {
          date: '2016',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          id: 2
        }, {
          date: '201',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          id: 3
        }, {
          date: '2016',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          id: 4
        }]
      },
      rules: {
        date: {
          func: (value) => this.checkValue(value)
        },
        name: {
          func: (value) => this.checkValue(value)
          // msg: '姓名输入不能为空!'
        },
        address: {
          func: (value) => this.checkValue(value)
        }
      },
      showEdit: []
    }
  },
  mounted () {
    this.setShowEdit()
  },
  methods: {
    checkValue (value) {
      if (!value || value.length === 0) {
        return '字符串不能为空'
      } else if (value.length > 5) {
        return '字符串不能超过5个'
      }
      return ''
    },
    setShowEditInit () {
      for (const item of this.showEdit) {
        for (const innerItem in item) {
          item[innerItem] = false
        }
      }
    },
    // 设置单元显示转态数据
    setShowEdit () {
      const tempShowEdit = []
      for (const item of this.form.tableData) {
        const tempShow = {}
        for (const innerItem in item) {
          if (item[innerItem].length === 0) {
            tempShow[innerItem] = true
          } else {
            tempShow[innerItem] = false
          }
        }
        tempShowEdit.push(tempShow)
      }
      this.showEdit = tempShowEdit
    },
    comfire (row) {
      console.log(this.form.tableData)
    },
    changeInput (row, column, cell, event) {
      const nowObj = column.property
      const index = this.form.tableData.findIndex((item) => {
        return item.id === row.id
      })
      this.showEdit[index][nowObj] = !this.showEdit[index][nowObj]
    },
    defaultFun () {
      return false
    },
    // 失焦
    inputBlur (index, props) {
      const value = this.form.tableData[index][props]
      const func = this.rules[props].func || this.defaultFun
      const msg = this.rules[props].msg || func(value) || ''
      if (func(value)) {
        this.$message({
          message: msg,
          type: 'warning'
        })
      } else {
        this.showEdit[index][props] = !this.showEdit[index][props]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
