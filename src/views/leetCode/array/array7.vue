<template>
  <div>
    请注意，返回的规范路径必须始终以斜杠 / 开头，并且两个目录名之间必须只有一个斜杠 /。最后一个目录名（如果存在）不能以 / 结尾。此外，规范路径必须是表示绝对路径的最短字符串。
    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/simplify-path
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    <div>
      输入："/home/"
      输出："/home"
      解释：注意，最后一个目录名后面没有斜杠。
    </div>
    <div>
      输入："/../"
      输出："/"
      解释：从根目录向上一级是不可行的，因为根是你可以到达的最高级。
    </div>
    <div>
      输入："/home//foo/"
      输出："/home/foo"
      解释：在规范路径中，多个连续斜杠需要用一个斜杠替换。
    </div>
    <div>
      输入："/a/./b/../../c/"
      输出："/c"
    </div>
    <div>
      输入："/a/../../b/../c//.//"
      输出："/c"
    </div>
    <div>
      输入："/a//b////c/d//././/.."
      输出："/a/b/c"
    </div>
  </div>
</template>

<script>
export default {
  name: "array7",
  data () {
    return {
      str: "/a/../../b/../c//.//"
    };
  },
  methods: {
    simplifyPath (path) {
      const stack = [];
      const pathArr = path.split("/");

      for (let item of pathArr) {
        if (item === "" || item === ".") {
          continue;
        } else if (item === "..") {
          stack.pop();
        } else {
          stack.push(item);
        }
      }

      return "/" + stack.join("/");
    }
  },
  mounted () {
    console.log(this.simplifyPath(this.str));
  }
};
</script>

<style>
</style>