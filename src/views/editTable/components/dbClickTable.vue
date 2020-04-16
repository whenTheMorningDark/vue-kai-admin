<template>
  <el-card class="box-card" :body-style="{height:'400px'}">
    <div slot="header" class="clearfix">
      <span>双击单元格编辑</span>
    </div>
    <div>
      <div class="editTable">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          max-height="300"
          @cell-dblclick="changeInput"
        >
          <el-table-column
            v-for="item in colData"
            :key="item.props"
            :prop="item.props"
            :label="item.label"
          >
            <template slot-scope="{row,$index}">
              <el-input
                v-if="showEdit[$index][item.props]"
                v-model="row[item.props]"
                v-focus
                @change="handleEdit(row, $index)"
                @blur="inputBlur($index, item.props)"
              />
              <span v-if="!showEdit[$index][item.props]">{{ row[item.props] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>
<script>
/* eslint-disable space-before-function-paren */
export default {
  name: "StandardLevel",
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.getElementsByTagName("input")[0].focus();
      }
    }
  },
  data () {
    return {
      isAdd: false,
      // 显示编辑框
      showEdit: [],
      colData: [
        { props: "date", label: "日期" },
        { props: "name", label: "姓名" },
        { props: "color", label: "颜色" }
      ],
      // 表格数据
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "上海市普陀区金沙江路 1518 弄",
          color: "#ff4500"
        }, {
          id: 2,
          date: "2016-05-04",
          name: "上海市普陀区金沙江路 1518 弄",
          color: "#ff8c00"
        },
        {
          id: 3,
          date: "2016-05-04",
          name: "上海市普陀区金沙江路 1518 弄",
          color: "#ff8c00"
        }
      ]
    };
  },
  watch: {
    // 监控tableData数据，发生改变的时候跟新单元格显示状态
    tableData: function () {
      this.setShowEdit();
    }
  },
  mounted () {
    this.setShowEdit();
  },
  methods: {
    // 初始化单元格显示状态
    setShowEditInit () {
      for (const item of this.showEdit) {
        for (const innerItem in item) {
          item[innerItem] = false;
        }
      }
    },
    // 设置单元显示转态数据
    setShowEdit () {
      const tempShowEdit = [];
      for (const item of this.tableData) {
        const tempShow = {};
        for (const innerItem in item) {
          if (item[innerItem].length === 0) {
            tempShow[innerItem] = true;
          } else {
            tempShow[innerItem] = false;
          }
        }
        tempShowEdit.push(tempShow);
      }
      this.showEdit = tempShowEdit;
    },
    // 切换单元格为编辑
    changeInput (row, column, cell, event) {
      this.isAdd = false;
      const nowObj = column.property;
      const index = this.tableData.findIndex((item) => item.id === row.id);
      this.showEdit[index][nowObj] = !this.showEdit[index][nowObj];
    },
    handleEdit (row, index) {
      this.tableData[index] = row;
    },
    // 失焦
    inputBlur (index, props) {
      this.setShowEditInit();
    },
    addData () {
      this.isAdd = true;
      const json = {
        id: this.tableData.length + 1,
        date: "",
        name: "",
        color: ""
      };
      this.tableData.push(
        json
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

