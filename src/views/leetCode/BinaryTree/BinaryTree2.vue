<template>
  <div>
    打乱一个没有重复的数组
    <div>
      // 以数字集合 1, 2 和 3 初始化数组。
      int[] nums = {1,2,3}; 45 Solution solution = new Solution(nums)
      // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。
      solution.shuffle(); 1011
      // 重设数组到它的初始状态[1,2,3]
      solution.reset();
      // 随机返回数组[1,2,3]打乱后的结果。
      solution.shuffle();
    </div>
  </div>
</template>

<script>
export default {
  name: "BinaryTree2",
  mounted () {
    const Solution = (nums) => {
      this.nums = nums;
      this.original = nums.slice(0);
    };
    Solution.prototype.reset = () => {
      this.nums = this.original;
      this.original = this.original.slice(0);
      return this.original;
    };
    // 返回一个随机排的数组
    Solution.prototype.shuffle = () => {
      const nums = this.nums.slice(0);
      const len = nums.length;
      for (let i = len - 1; i > 0; i--) {
        const targetIndex = Math.floor(Math.random() * (i + 1));
        const tmp = nums[i];
        nums[i] = nums[targetIndex];
        nums[targetIndex] = tmp;
      }
      return nums;
    };
    let solution = new Solution([1, 2, 3, 4, 5]);
    console.log(solution.shuffle());
    console.log(solution.reset());
  }
};
</script>

<style>
</style>