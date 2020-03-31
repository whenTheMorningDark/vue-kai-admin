<template>
  <el-card
    class="box-card"
    :body-style="{height:'400px'}"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span>点击当前列修改</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        size="mini"
        @click="addFun"
      >添加</el-button>
    </div>
    <div>
      <div class="clickRowTable">

        <el-table
          :data="tableData"
          style="width: 100%;margin-top:5px"
          border
          max-height="300"
        >
          <el-table-column
            prop="date"
            label="日期"
          >
            <template slot-scope="{row}">
              <el-input
                v-if="row.edit"
                v-model="row.date"
                size="mini"
              />
              <span v-else>{{ row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
          >
            <template slot-scope="{row}">
              <el-input
                v-if="row.edit"
                v-model="row.name"
                size="mini"
              />
              <span v-else>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
          >
            <template slot-scope="{row}">
              <el-input
                v-if="row.edit"
                v-model="row.address"
                size="mini"
              />
              <span v-else>{{ row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <template v-if="!row.edit">
                <el-button
                  type="primary"
                  size="mini"
                  @click="editFun(row)"
                >编辑</el-button>
              </template>
              <template v-else>
                <el-button
                  type="success"
                  size="mini"
                  @click="comfire(row)"
                >确定</el-button>
                <el-button
                  type="info"
                  size="mini"
                  @click="cancel(row)"
                >取消</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>

</template>
<script>
/* eslint-disable space-before-function-paren */
const keys = 'orinigal'
export default {
  name: 'ClickRowTable',
  data () {
    return {
      // 表格数据
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市'
      }],
      arrKeys: []
    }
  },
  mounted () {
    this.setTableInit()
  },
  methods: {
    setTableInit () {
      if (this.tableData && this.tableData.length > 0) {
        this.arrKeys = Object.keys(this.tableData[0])
        this.tableData = this.tableData.map(v => {
          for (const key in v) {
            this.$set(v, key + keys, v[key])
          }
          this.$set(v, 'edit', false)
          return v
        })
      }
    },
    editFun (row) {
      this.$set(row, 'edit', true)
    },
    comfire (row) {
      this.arrKeys.forEach(v => {
        this.$set(row, v + keys, row[v])
      })
      this.$set(row, 'edit', false)
    },
    cancel (row) {
      this.arrKeys.forEach(v => {
        this.$set(row, v, row[v + keys])
      })
      this.$set(row, 'edit', false)
    },
    addFun () {
      const dataJson = this.createTableJson(this.arrKeys)
      this.tableData.push(dataJson)
    },
    createTableJson (arr) {
      if (!arr || arr.length === 0) {
        return {}
      }
      const json = {
        edit: true
      }
      arr.forEach(v => {
        if (!json[v]) {
          json[v] = ''
          json[v + keys] = ''
        }
      })
      return json
    }
  }
}
</script>
<style lang="scss" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
</style>
