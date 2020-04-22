<template>
  <div>
    <p>给你一个混合了数字和字母的字符串 s，其中的字母均为小写英文字母。</p>
    <p>请你将该字符串重新格式化，使得任意两个相邻字符的类型都不同。也就是说，字母后面应该跟着数字，而数字后面应该跟着字母。</p>
    <p>请你返回 重新格式化后 的字符串；如果无法按要求重新格式化，则返回一个 空字符串 。</p>
    <p>https://leetcode-cn.com/problems/reformat-the-string/</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      targetStr: "ab123"
    };
  },
  methods: {
    reformat (s) {
      if (s.length === 1 || s.length === 0) {
        return "";
      }
      let strArr = s.match(/[a-g]/g);
      let numArr = s.match(/[0-9]/g);
      let res = [];
      if (numArr === null || strArr === null || Math.abs(strArr.length - numArr.length) > 1) {
        return "";
      }
      while (strArr.length > 0 && numArr.length > 0) {
        strArr.length > numArr.length ? res.push(strArr.shift(), numArr.shift()) : res.push(numArr.shift(), strArr.shift());
      }
      return res.concat(strArr, numArr).join();
    }
  },
  mounted () {
    console.log(this.reformat(this.targetStr));
  }
};
</script>

<style>
</style>
