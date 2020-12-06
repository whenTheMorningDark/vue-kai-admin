<template>
  <div class="toolbar">
    <el-button size="mini" @click="save">
      保存(在控制台查看json数据)
    </el-button>
    <!-- <el-button size="mini">
      保存至图片
    </el-button>
    <el-button size="mini">
      回退
    </el-button>
    <el-button size="mini">
      前进
    </el-button> -->
  </div>
</template>

<script>
export default {
  name: "toolbar",
  methods: {
    save() {
      this.$emit("save");
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar{
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>