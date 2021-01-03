<template>
  <div>数组方法分析</div>
</template>

<script>
export default {
  data() {
    return {
      reTrim: /^\s+|\s+$/g // 去掉头部和尾部的空格
    };
  },
  mounted() {
    // let value =
    let targetArr = ["a", "b", "c", "d"];
    console.log(this.chunk(targetArr, "2  2"));
  },
  methods: {
    chunk(arr, size = 1) {
      size = Math.max(this.toInteger(size),);
    },

    // 将value转换称为正整数
    toInteger(value) {
      // const result = this.toFinite(value);
    },
    toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = this.toNumber(value);
    },


    // 把输入的值作为number类型返回
    toNumber(value) {
      console.log(value);
      if (typeof value === "number") {
        return value;
      }
      if (this.isObject(value)) {
        const other = typeof value.valueOf === "function" ? value.valueOf() : value;
        value = this.isObject(other) ? `${other}` : other;
      }
      if (typeof value !== "string") {
        // console.log(value);
        return value === 0 ? value : +value;
      }
      value = value.replace(this.reTrim, "");
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