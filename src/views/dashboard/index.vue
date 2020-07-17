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
    isBipartite (graph) {
      const visited = {}; // undefined为未染色，1为蓝色，-1为黄色
      // console.log(visited)
      for (let i = 0; i < graph.length; i++) { // 遍历每个顶点
        // console.log(graph[i])
        if (visited[i]) {
          continue;
        } // 已经染过色的，跳过
        const queue = [i]; // 队列初始推入顶点 i
        visited[i] = 1; // 染为蓝色
        while (queue.length) { // 遍历顶点 i 所有相邻的顶点
          const cur = queue.shift(); // 考察出列的顶点
          const curColor = visited[cur]; // 出列顶点的颜色
          const neighborColor = -curColor; // 它的相邻顶点应该有的颜色
          for (let i = 0; i < graph[cur].length; i++) { // 给他们都上色
            const neighbor = graph[cur][i];
            console.log(neighbor);
            if (visited[neighbor] === undefined) { // 还没上色
              visited[neighbor] = neighborColor; // 上色
              queue.push(neighbor); // 并推入队列
            } else if (visited[neighbor] !== neighborColor) { // 上了不对的颜色
              return false;
            }
          }
        }
      }

      return true; // 遍历完所有顶点，没有发现哪里不对
    }
  },
  mounted () {
    let nums = [[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]];
    console.log(this.isBipartite(nums));
  }
};
</script>
