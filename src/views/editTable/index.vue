<template>
  <el-scrollbar
    wrap-class="scrollbar-wrapper"
    style="height:100%"
  >
    <div class="tablePane">
      <el-row>
        <el-col :span="12">
          <dbClickTable />
        </el-col>
        <el-col :span="12">
          <clickRowTable />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <validatorTable />
        </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>
<script>
/* eslint-disable space-before-function-paren */
import dbClickTable from './components/dbClickTable'
import clickRowTable from './components/clickRowTable'
import validatorTable from './components/validatorTable'
export default {
  name: 'EditTable',
  components: {
    dbClickTable,
    clickRowTable,
    validatorTable
  }
}
</script>
<style lang="scss" scoped>
.tablePane {
  padding: 5px;
  height: 100%;
}
</style>

