<template>
  <div class="settingDialog">
    <i class="el-icon-setting settingDialog-icon" @click="handleClick"></i>
    <el-dialog
      title="设置字体样式"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      destroy-on-close
    >
      <colorFont v-bind="$props" @changeColorFont="changeColorFont"></colorFont>
    </el-dialog>
  </div>
</template>

<script>
import colorFont from "../colorFont";
export default {
  name: "settingDialog",
  data () {
    return {
      dialogVisible: false
    };
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: true
    },
    attrs: {
      type: String,
      default: ""
    },
    attrsKey: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 50
    }
  },
  components: {
    colorFont
  },
  methods: {
    handleClose (done) {
      done();
    },
    changeColorFont (keys) {
      this.$emit("changeColorFont", this.attrs, `${this.attrsKey}.${keys}`, this.dataInfo[this.attrsKey][keys]);
    },
    handleClick () {
      this.$emit("click", this.showDialogFun);
    },
    showDialogFun () {
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.settingDialog {
  .settingDialog-icon {
    cursor: pointer;
  }
  /deep/ .el-dialog__header {
    padding: 10px;
  }
  /deep/ .el-dialog__body {
    padding: 0px 10px 10px 0;
  }
}
</style>
