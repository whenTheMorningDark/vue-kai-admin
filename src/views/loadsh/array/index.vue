<template>
  <div>数组方法分析</div>
</template>

<script>
export default {
  mounted() {
    // let value =
    let obj = ["123", "789"];
    console.log(obj.valueOf());
    console.log(this.toNumber(obj));
  },
  methods: {
    // 把输入的值作为number类型返回
    toNumber(value) {
      if (typeof value === "number") {
        return value;
      }
      console.log(this.isObject(value));
      if (this.isObject(value)) {
        console.log(typeof value.valueOf === "function");
        const other = typeof value.valueOf === "function" ? value.valueOf() : value;
        console.log(this.isObject(other));
        value = this.isObject(other) ? `${other}` : other;

      }
      console.log(value);

    },
    isObject(value) {
      const type = typeof value;
      return value !== null && (type === "object" || type === "function");
    }
  }
};
</script>

<style>

</style>