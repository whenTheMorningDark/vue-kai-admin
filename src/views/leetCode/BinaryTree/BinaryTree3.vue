<template>
  <div>
    <p>给定一个包含了一些 0 和 1 的非空二维数组 grid 。</p>
    <p>一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。</p>
    <p>找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0 。)</p>
    <p>链接：https://leetcode-cn.com/problems/max-area-of-island</p>
    <p>
      [[0,0,1,0,0,0,0,1,0,0,0,0,0],
      [0,0,0,0,0,0,0,1,1,1,0,0,0],
      [0,1,1,0,1,0,0,0,0,0,0,0,0],
      [0,1,0,0,1,1,0,0,1,0,1,0,0],
      [0,1,0,0,1,1,0,0,1,1,1,0,0],
      [0,0,0,0,0,0,0,0,0,0,1,0,0],
      [0,0,0,0,0,0,0,1,1,1,0,0,0],
      [0,0,0,0,0,0,0,1,1,0,0,0,0]]
    </p>
    <p>对于上面这个给定矩阵应返回 6。注意答案不应该是 11 ，因为岛屿只能包含水平或垂直的四个方向的 1 。</p>
  </div>
</template>

<script>
/* eslint-disable require-jsdoc */

export default {
  name: "BinaryTree3",
  mounted () {
    let grid = [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
    ];

    var maxAreaOfIsland = function (grid) {
      let result = 0;
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          if (grid[row][col] === 1) {
            let count = dfs(row, col);
            result = Math.max(result, count);
          }
        }
      }
      function dfs (row, col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === 0) {
          return 0;
        }
        grid[row][col] = 0;
        let count = 1;
        count += dfs(row - 1, col);
        count += dfs(row + 1, col);
        count += dfs(row, col - 1);
        count += dfs(row, col + 1);
        return count;
      }
      return result;
    };
    console.log(maxAreaOfIsland(grid));
  }
};
</script>

<style>
</style>