<template>
  <div class="maxChildnumsay">
    <div class="title">
      <img :src="tipImg" />
    </div>
  </div>
</template>

<script>
import tipImg from "./images/1.png";
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
.maxChildnumsay {
  width: 100%;
  height: 100%;
  .title {
    padding: 10px;
    text-align: center;
  }
}
</style>