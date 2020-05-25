<template>
  <div>
    <render title="asdasda" v-on="$listeners"></render>
  </div>
</template>
<script>
/* eslint-disable require-jsdoc */
import render from "./render";
export default {
  name: "dash",
  components: {
    render
  },
  data () {
    return {
      str: "hello   world",
      arr: [4, 7, 8]
    };
  },
  methods: {
    aFun () {
      console.log("a");
    },
    reverserStr (s) {
      let left = 0;
      let right = s.length - 1;
      let queue = [];
      let word = "";
      queue.unshift(word);
      while (s.charAt(left) === " ") {
        left++;
      }
      while (s.charAt(right) === " ") {
        right--;
      }
      while (left <= right) {
        let char = s.charAt(left);
        if (char === " " && word) {
          queue.unshift(word);
          word = "";
          console.log(queue);
        } else if (char !== " ") {
          word += char;
        }
        left++;
      }
      queue.unshift(word);
      return queue.join(" ");
    },
    permute (nums) {
      // 缓存数组的长度
      const len = nums.length;
      // curr 变量用来记录当前的排列内容
      const curr = [];
      // res 用来记录所有的排列顺序
      const res = [];
      // visited 用来避免重复使用同一个数字
      const visited = {};
      // 定义 dfs 函数，入参是坑位的索引（从 0 计数）
      function dfs (nth) {
        // 若遍历到了不存在的坑位（第 len+1 个），则触碰递归边界返回
        if (nth === len) {
          // 此时前 len 个坑位已经填满，将对应的排列记录下来
          res.push(curr.slice());
          return;
        }
        // 检查手里剩下的数字有哪些
        for (let i = 0; i < len; i++) {
          // 若 nums[i] 之前没被其它坑位用过，则可以理解为“这个数字剩下了”
          if (!visited[nums[i]]) {
            // 给 nums[i] 打个“已用过”的标
            visited[nums[i]] = 1;
            // 将nums[i]推入当前排列
            curr.push(nums[i]);
            // 基于这个排列继续往下一个坑走去
            dfs(nth + 1);
            // nums[i]让出当前坑位
            curr.pop();
            // 下掉“已用过”标识
            visited[nums[i]] = 0;
          }
        }
      }
      // 从索引为 0 的坑位（也就是第一个坑位）开始 dfs
      dfs(0);
      return res;
    }
  },
  mounted () {
    console.log(this.reverserStr(this.str));
    console.log(this.permute(this.arr));
  }
};
</script>
