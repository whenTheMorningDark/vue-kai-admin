<template>
  <div>
    <p>
      给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。
      在 S 上反复执行重复项删除操作，直到无法继续删除。
      在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。
      来源：力扣（LeetCode）
      链接：https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string
      著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      s: "bca"
    };
  },
  methods: {
    // removeDuplicates (s) {
    //   if (!s || s.length === 0) {
    //     return "";
    //   }
    //   let stack = [];
    //   stack.push(s[0]);
    //   for (let i = 1; i < s.length; i++) {
    //     let prev = stack.pop();
    //     if (prev !== s[i]) {
    //       stack.push(prev);
    //       stack.push(s[i]);
    //     }
    //   }
    //   return stack.join("");
    // }
    removeDuplicateLetters (s) {
      var stack = [];
      for (var i = 0; i < s.length; i++) {
        var char = s[i];
        if (stack.indexOf(char) > -1) {continue;}
        // 使用indexOf(xx, i)取代 lastIndexOf(xx)减少遍历次数会更快
        while (stack.length > 0 && stack[stack.length - 1] > char && s.indexOf(stack[stack.length - 1], i) > i) {
          stack.pop();
        }
        stack.push(char);
      }
      return stack.join("");

    }
  },
  mounted () {
    console.log(this.removeDuplicateLetters(this.s));
  }
};
</script>

<style>
</style>
