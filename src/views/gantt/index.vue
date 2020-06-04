<template>
  <div class="container">
    <!-- <el-button @click="getJson">获取json</el-button> -->
    <Gantt class="left-container" :tasks="tasks" ref="gantt"></Gantt>
  </div>
</template>

<script>
import Gantt from "@/components/Gantt";
export default {
  name: "viewGant",
  components: {
    Gantt
  },
  data () {
    return {
      tasks: {
        data: [
          { id: 1, text: "Task #1", start_date: "2020-06-1", duration: 3, progress: 1, state: "finished" },
          { id: 2, text: "Task #2", start_date: "2020-06-9", duration: 3, progress: 0.4, state: "unfinished" },
          { id: 22, text: "Task #22", start_date: "2020-06-20", duration: 3, progress: 0.4 }
        ],
        links: [
          { id: 1, source: 1, target: 2, type: "0" }
        ]
      }
    };
  },
  methods: {
    getJson () {
      console.log(this.$refs.gantt.getJson());
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  width: 100%;
}
.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}
</style>