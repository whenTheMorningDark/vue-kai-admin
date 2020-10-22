<template>
  <div>asd</div>
</template>
<script>
// import A from "./a";
// import { getIntersection } from "@/utils/index";
import "./call";
export default {
  components: {
  },
  data () {
    return {
      targetArr: [5, 13, 19, 21, 37, 56, 64, 75, 80, 21, 88, 92],
      key: 21,
      test: 77778
    };
  },
  methods: {
    testFun () {
      console.log("B组件的事件触发");
    },
    // 二分法
    // 循坏
    binary_search (arr, key) {
      var low = 0; var high = arr.length - 1;
      while (low <= high) {
        var mid = low + ((high - low) >> 1);
        if (arr[mid] > key) {
          high = mid - 1;
        } else if (arr[mid] < key) {
          low = mid + 1;
        } else {
          if ((mid === arr.length - 1) || (arr[mid + 1] !== key)) {
            return mid;
          } else {
            low = mid + 1;
          }
        }
      }
      return -1;
    },
    minPathSum (grid) {
      let rows = grid.length;
      let cols = grid[0].length;
      let dp = [];
      for (let i = 0; i < rows; i++) {
        dp[i] = [];
      }
      dp[0][0] = grid[0][0];
      for (let i = 0; i < rows; i++) {
        if (i > 0) {
          dp[i][0] = dp[i - 1][0] + grid[i][0];
        }
      }
      for (let i = 0; i < cols; i++) {
        if (i > 0) {
          dp[0][i] = dp[0][i - 1] + grid[0][i];
        }
      }
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (i > 0 && j > 0) {
            dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
          }
        }
      }
      return dp[rows - 1][cols - 1];
    }
  },
  mounted () {
    let grid = [
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1]
    ];
    console.log(this.minPathSum(grid));
  }
};
</script>
