<template>
  <div class="bagQuestion">
    <div class="title">
      <img :src="tipImg" />
    </div>
    <div class="desc">
      <div>描述:</div>
      <div>给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。其中第 i 个物品的重量为 wt[i]，价值为 val[i]，现在让你用这个背包装物品，最多能装的价值是多少？</div>
    </div>
  </div>
</template>

<script>
import tipImg from "./images/2.png";
export default {
  name: "maxChildnumsay",
  data () {
    return {
      tipImg
    };
  },
  methods: {
    maxSubnumsay (nums) {
      if (!nums || nums.length === 0) {
        return 0;
      }
      let len = nums.length;
      let dp = new Array(len);
      dp[0] = nums[0];
      for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
      }
      // console.log(dp);
      let res = -Infinity;
      for (let i = 0; i < len; i++) {
        res = Math.max(res, dp[i]);
      }
      return res;
    }
  },
  mounted () {
    let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    console.log(this.maxSubnumsay(nums));
  }
};
</script>

<style lang="scss" scoped>
.bagQuestion {
  width: 100%;
  height: 100%;
  .title {
    padding: 10px;
    text-align: center;
  }
}
</style>