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
    maxSubnumsay (n, W, wt, val) {
      let dp = [];
      for (let i = 0; i <= n; i++) {
        dp[i] = [];
        for (let j = 0; j <= W; j++) {
          dp[i][j] = 0;
        }
      }
      wt.unshift(0);
      val.unshift(0);
      for (var i = 1; i <= n; i++) { // n是物品的个数 3
        for (var j = 1; j <= W; j++) { // W 重量为4的背包
          if (j < wt[i]) { // 当 1 < 2
            dp[i][j] = dp[i - 1][j]; // dp[1][1] = dp[0][1] = 0
          } else { // 当 2<1 // dp[1][2] = dp[0][2], 0+4
            dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - wt[i]] + val[i]);
          }
        }
      }
      return dp[n][W];

    }
  },
  mounted () {
    let n = 3; // 多少个物品
    let W = 4; // 重量为4的背包
    let weights = [2, 1, 3]; // 物品的重量
    let values = [4, 2, 3]; // 物品的价值
    console.log(this.maxSubnumsay(n, W, weights, values));
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