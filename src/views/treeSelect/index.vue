<template>
  <div style="padding:10px">
    <el-row>
      <el-col :span="12">
        <treeSelect :data="treeData" v-model="select" checkbox :width="500" ref="treeSelect"></treeSelect>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="getCurrentData">获取当前选择的数据</el-button>
        <el-button type="primary" size="mini" @click="clear">清空当前数据</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import treeSelect from "@/components/treeSelect";
export default {
  components: {
    treeSelect
  },
  data () {
    return {
      treeData: [{
        id: 1,
        label: "一级 1",
        children: [{
          id: 4,
          label: "二级 1-1",
          children: [{
            id: 9,
            label: "三级 1-1-1"
          }, {
            id: 10,
            label: "三级 1-1-2"
          }]
        }]
      }, {
        id: 2,
        label: "一级 2",
        children: [{
          id: 5,
          label: "二级 2-1"
        }, {
          id: 6,
          label: "二级 2-2"
        }]
      }, {
        id: 3,
        label: "一级 3",
        children: [{
          id: 7,
          label: "二级 3-1"
        }, {
          id: 8,
          label: "二级 3-2"
        }, {
          id: 18,
          label: "二级 3-2"
        }, {
          id: 82,
          label: "二级 3-2"
        }, {
          id: 84,
          label: "二级 3-2"
        }, {
          id: 842,
          label: "二级 3-2"
        }, {
          id: 847,
          label: "二级 3-2"
        }]
      },
      {
        id: 11,
        label: "最外面"
      }
      ],
      select: [9, 5]
    };
  },
  methods: {
    getCurrentData () {
      console.log(this.$refs.treeSelect.getCurrentData());
    },
    clear () {
      this.$refs.treeSelect.clear();
    }
  }
};
</script>

<style>
</style>