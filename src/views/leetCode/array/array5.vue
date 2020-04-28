<template>
  <div>给定一个按照升序排列的整数数组nums,和一个目标值target找出它在数组中的开始位置和结束位置</div>
</template>

<script>
export default {
  name: "array5",
  data () {
    return {
      nums: [5, 7, 7, 8, 8, 10],
      target: 8
    };
  },
  methods: {
    filter (nums, target) {
      let arr = [];
      if (!Array.isArray(nums) || nums.length === 0) {
        return arr;
      }
      let start = 0;
      let end = nums.length - 1;
      while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        // let mid = start + ((start - end) >> 1);
        if (nums[mid] < target) {
          start = mid + 1;
        } else if (nums[mid] > target) {
          end = mid - 1;
        } else { // 找到这个index
          console.log(mid);
          return mid;
        }
      }
    }
  },
  mounted () {
    console.log(this.filter(this.nums, this.target));
  }
};
</script>

<style>
</style>