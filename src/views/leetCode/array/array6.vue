<template>
  <div>
    给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
    说明：你不能倾斜容器，且 n 的值至少为 2。
    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/container-with-most-water
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
    <div>
      输入：[1,8,6,2,5,4,8,3,7]
      输出：49
    </div>
  </div>
</template>

<script>
export default {
  name: "array5",
  data () {
    return {
      arr: [1, 8, 6, 2, 5, 4, 8, 3, 7]
    };
  },
  methods: {
    maxArea (height) {
      if (height.length === 0 || height.length < 2) {
        return 0;
      }
      let l = 0;
      let r = height.length - 1;
      let ans = 0;
      while (l < r) {
        let res = Math.min(height[l], height[r]) * (r - l);
        ans = Math.max(ans, res);
        if (height[l] <= height[r]) {
          l++;
        } else {
          r--;
        }
      }
      return ans;
    }
  },
  mounted () {
    console.log(this.maxArea(this.arr));
  }
};
</script>

<style>
</style>