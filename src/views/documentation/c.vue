<template>
  <div>
    <p>C ---{{$attrs}}</p>
  </div>
</template>

<script>
/* eslint-disable block-spacing */

export default {
  name: "c",
  mounted () {
    // eslint-disable-next-line require-jsdoc
    const coinChange = (coins, amount) => {
      // 初始化备忘录,用Infinity填满备忘录，Infinity说明该值不可以用硬币凑出来
      const dp = new Array(amount + 1).fill(Infinity);

      // 设置初始条件为 0
      dp[0] = 0;

      for (var i = 1; i <= amount; i++) {
        for (const coin of coins) {
          // 根据动态转移方程求出最小值
          if (coin <= i) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
          }
        }
      }

      // 如果 `dp[amount] === Infinity`说明没有最优解返回-1,否则返回最优解
      return dp[amount] === Infinity ? -1 : dp[amount];
    };
    console.log(coinChange([1, 2, 3], 6));

  }
};
</script>

<style>
</style>