<template>
  <div class="areaForm">
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      <el-form-item :label="item.label" v-for="item in formData" :key="item.props">
        <el-input-number v-model="form[item.props]" :min="0" :step="10" :disabled="disabled" @change="changeFun(item.props,form[item.props])"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即购买</el-button>
        <el-button>重置</el-button>
      </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  name: "areaForm",
  data() {
    return {
      form: {},
      formData: [
        {props: "bigApple", label: "大苹果"},
        {props: "smallApple", label: "小苹果"},
        {props: "bigBanana", label: "大香蕉"},
        {props: "smallBanana", label: "小香蕉"},
        {props: "bigPear", label: "大雪梨"},
        {props: "smallPear", label: "小雪梨"},
        {props: "bigMelon", label: "大西瓜"},
        {props: "smallMelon", label: "小西瓜"},
        {props: "bigOrange", label: "大橘子"},
        {props: "smallOrange", label: "小橘子"},
        {props: "bigStar", label: "大星星"},
        {props: "smallStar", label: "小星星"},
      ],
      disabled: false
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.form);
      this.$emit("submit", this.form);
    },
    changeFun(key, value) {
      this.$emit("change", {key, value});
    }
  },
  created() {
    let props = this.formData.map(v => v.props);
    props.forEach(v => {
      // this.form()
      this.$set(this.form, v, 0);
    });
  }
};
</script>

<style lang="scss" scoped>
.areaForm{
  padding-top: 20px;
}
</style>

