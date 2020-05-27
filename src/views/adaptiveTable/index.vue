<template>
  <div class="adaptive-table">
    <el-table :data="tableData" border style="width: 100%" height="100%">
      <el-table-column type="index" width="180" label="序号"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { addResizeListener, removeResizeListener } from "element-ui/src/utils/resize-event";
export default {
  name: "adaptiveTable",
  data () {
    return {
      tableData: Array.from({ length: 30 }, (k, v) => ({
        date: "2016-05-02" + v,
        name: "王小虎" + v,
        address: "上海市普陀区金沙江路 1518 弄" + v
      }))
    };
  }
};
</script>

<style>
.adaptive-table {
  height: calc(100vh - 50px - 34px);
}
</style>