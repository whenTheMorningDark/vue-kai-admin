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
          {id: 11, text: "Project #1", start_date: "2020-03-01", duration: 0, type: "project", progress: 0.6, open: true},

          {id: 12, text: "Task #1", start_date: "2020-03-01", duration: 5, parent: 11, progress: 1, open: true},
          {id: 13, text: "Task #2", start_date: "2020-03-02", type: "project", parent: 11, progress: 0.5, open: true},
          {id: 14, text: "Task #3", start_date: "2020-02-03", duration: 6, parent: 11, progress: 0.8, open: true},
          {id: 15, text: "Task #4", start_date: null, duration: 0, type: "project", parent: 11, progress: 0.2, open: true},

          {id: 17, text: "Task #2.1", start_date: "2020-03-02", duration: 2, parent: 13, progress: 1, open: true},
          {id: 18, text: "Task #2.2", start_date: "2020-06-02", duration: 3, parent: 13, progress: 0.8, open: true},
          {id: 19, text: "Task #2.3", start_date: "2020-10-02", duration: 4, parent: 13, progress: 0.2, open: true},
          {id: 20, text: "Task #2.4", start_date: "2020-15-02", duration: 4, parent: 13, progress: 0, open: true},
          {id: 21, text: "Task #4.1", start_date: "2020-03-02", duration: 4, parent: 15, progress: 0.5, open: true},
          {id: 22, text: "Task #4.2", start_date: "2020-08-02", duration: 4, parent: 15, progress: 0.1, open: true}
        ],
        links: [
          {id: 1, source: 17, target: 18, type: "0"},
          {id: 2, source: 18, target: 19, type: "0"},
          {id: 3, source: 19, target: 20, type: "0"},
          {id: 4, source: 21, target: 22, type: "0"}
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