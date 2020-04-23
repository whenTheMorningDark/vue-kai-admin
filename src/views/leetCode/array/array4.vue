<template>
  <div>
    <p>编写一个函数来查找字符串数组中的最长公共前缀。</p>
    <p>如果不存在公共前缀，返回空字符串 ""。</p>
    <p>https://leetcode-cn.com/problems/longest-common-prefix/</p>
    <p>输入: ["flower","flow","flight"]</p>
    <p>输出: "fl"</p>
    <p>输入: ["dog","racecar","car"]</p>
    <p>输出: ""</p>
    <p>解释: 输入不存在公共前缀。</p>
    <strong>思路:</strong>
    <p>数组里面两两分别匹配，找出最大子字符串(deep函数)</p>
    <p>找到两两匹配的最大字符串后,利用splice塞进原有的数组里面，判断此时arr的长度是否大于等于,如果是则继续递归，如果不是则返回该字符串</p>
  </div>
</template>

<script>
/* eslint-disable require-jsdoc */

export default {
  data () {
    return {
      str1: "flow",
      str2: "flower",
      arr: ["flower", "flow", "flight"]
    };
  },
  methods: {
    // compare (arr) {
    //   if (arr.length === 0) {
    //     return "";
    //   }
    //   let preFix = arr[0];
    //   for (let i = 1; i < arr.length; i++) {
    //     while (arr[i].indexOf(preFix) !== 0) {
    //       preFix = preFix.substring(0, preFix.length - 1);
    //       if (preFix.length === 0) {
    //         return "";
    //       }
    //     }
    //   }
    //   return preFix;
    // }
    deep (str1, str2) {
      if (str1.length === 0 || str2.length === 0) {
        return "";
      }
      let l = str1.length > str2.length ? str2.length : str1.length;
      let i = 0;
      while (i < l) {
        if (str1[i] !== str2[i]) {
          break;
        }
        i++;
      }
      return str1.substr(0, i);
    },
    compare (arr) {
      if (arr.length <= 1) {
        return arr[0];
      }
      let str = "";
      str = this.deep(arr[0], arr[1]);
      arr.splice(0, 2, str);
      if (arr.length >= 2) {
        return this.compare(arr);
      }
      return str;
    }
  },
  mounted () {
    console.log(this.compare(this.arr));
  }
};
</script>

<style>
</style>