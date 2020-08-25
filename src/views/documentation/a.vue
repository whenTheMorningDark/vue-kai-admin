<template>
  <div class="a">
    <p>a---{{$attrs}}</p>
    <!-- <span>a</span>
    <el-button @click="getData">获取</el-button>-->
    <B v-bind="$attrs" v-on="$listeners"></B>
    <!-- <B ref="b" :is-check-mutile="isCheckMutile">
      <template slot="header">
        <el-row>
          <el-col :span="10">
            <el-input v-model="searchText" size="mini" />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="searchFun">搜索</el-button>
          </el-col>
        </el-row>
      </template>
    </B>-->
  </div>
</template>

<script>
import B from "./b";
export default {
  name: "A",
  inheritAttrs: false,
  components: {
    B
  },
  props: {
    // keya: {
    //   type: [Number, String]
    // },
    // title: {
    //   type: [Number, String]
    // },
    text: {
      type: String,
      default: ""
    },
    array: {
      type: Array,
      default: () => []
    },
    object: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isCheckMutile: false,
      searchText: "",
      treeData: [
        {
          id: 1, text: "text1", children: [
            { id: 2, text: "text1-1", children: [], pId: 1 },
            { id: 3, text: "text1-2", children: [], pId: 1 }
          ]
        },
        {
          id: 4, text: "text4", children: [
            { id: 5, text: "text5", children: [] }
          ]
        }
      ],
      menu: [
        { "id": "b25dbd2e-a70d-471f-a9c6-3a43143d779d", "pId": null, "Sort": 0, "Name": "12312312" },
        { "id": "9426273b-b6d4-4836-b875-f23473b3ede6", "pId": "1", "Sort": 1, "Name": "777" },
        { "id": "1", "pId": "b25dbd2e-a70d-471f-a9c6-3a43143d779d", "Sort": 0, "Name": "88" },
        { "id": "e04aaea7-5532-48c9-841a-db1a0ddbc6e6", "pId": "1", "Sort": 1, "Name": "999" }
      ],
      dataMenu: [
        { "id": 1, "parentId": 0, "Sort": 0, "Name": "菜单1" },
        { "id": 2, "parentId": 1, "Sort": 0, "Name": "菜单1-1" },
        { "id": 3, "parentId": 1, "Sort": 1, "Name": "菜单1-2" },
        { "id": 4, "parentId": 2, "Sort": 2, "Name": "菜单1-1-2" },
        { "id": 5, "parentId": 2, "Sort": 1, "Name": "菜单1-1-1" },
        { "id": 6, "parentId": 0, "Sort": 1, "Name": "菜单2" },
        { "id": 7, "parentId": 6, "Sort": 0, "Name": "菜单2-1" },
        { "id": 8, "parentId": 6, "Sort": 1, "Name": "菜单2-2" },

        { "id": 10, "parentId": 8, "Sort": 1, "Name": "菜单2-2-1" },
        { "id": 11, "parentId": 10, "Sort": 0, "Name": "菜单2-2-1-1" },
        { "id": 9, "parentId": 8, "Sort": 2, "Name": "菜单2-2-2" }
      ],
      test: [
        { id: 1, parentId: 0, name: "一级菜单A", rank: 1 },
        { id: 2, parentId: 0, name: "一级菜单B", rank: 1 },
        { id: 3, parentId: 0, name: "一级菜单C", rank: 1 },
        { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2 },
        { id: 5, parentId: 1, name: "二级菜单A-B", rank: 2 },
        { id: 6, parentId: 2, name: "二级菜单B-A", rank: 2 },
        { id: 7, parentId: 4, name: "三级菜单A-A-A", rank: 3 },
        { id: 8, parentId: 7, name: "四级菜单A-A-A-A", rank: 4 },
        { id: 9, parentId: 8, name: "五级菜单A-A-A-A-A", rank: 5 },
        { id: 10, parentId: 9, name: "六级菜单A-A-A-A-A-A", rank: 6 },
        { id: 11, parentId: 10, name: "七级菜单A-A-A-A-A-A-A", rank: 7 },
        { id: 12, parentId: 11, name: "八级菜单A-A-A-A-A-A-A-A", rank: 8 },
        { id: 13, parentId: 12, name: "九级菜单A-A-A-A-A-A-A-A-A", rank: 9 },
        { id: 14, parentId: 13, name: "十级菜单A-A-A-A-A-A-A-A-A-A", rank: 10 }
      ]
    };
  },
  computed: {
    cUserName () {
      return this.name;
    }
  },
  mounted () {
    const childrenNode = {
      id: 6,
      text: "text6-1",
      children: []
    };
    this.addTreeData(this.treeData, 1, childrenNode);
    this.delTreeData(this.treeData, 2);
    // this.delTreeData(this.treeData, 4)
    this.setTreeDataValue(this.treeData, 4, "text", "777");
    console.log(this.treeData);
    console.log(this.getTreeData(this.treeData, 5));
    // console.log(this.getTreeData(this.treeData, 1))
    // console.log(this.getTreeData(this.treeData, 2))
    console.log(this.getTree(this.dataMenu));
  },
  methods: {
    changMenuData (data) {
      // let resultData;
      // data.forEach(v => {
      //   resultData = this.changDfs(data, v);
      // });
      // console.log(resultData);
      // console.log(this.changDfs(data, data[1]));
      let mId = data.filter(v => !(data.map(s => s.id).includes(v.pId)));
      console.log(mId);
    },
    // 递归生成树结构
    // recursion (total, item) {
    //   if (!total || total.children === 0) {
    //     return;
    //   }
    //   total.forEach(v => {
    //     if (v.Id === item.ParentId) {
    //       v.children = v.children || [];
    //       v.children.push(item);
    //       v.children.sort((a, b) => a.Sort - b.Sort);
    //     }
    //     this.recursion(v.children, item);
    //   });
    // },
    // 根据pid和id生成树结构
    getTree (source) {
      let cloneData = JSON.parse(JSON.stringify(source)); // 对源数据深度克隆
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => father.id === child.parentId); // 返回每一项的子级数组
        branchArr.length > 0 ? father.children = branchArr : ""; // 如果存在子级，则给父级添加一个children属性，并赋值
        return father.parentId === 0; // 返回第一层
      });
    },

    getData () {
      console.log(this.$refs.b.getCheckedNodesFun());
    },
    searchFun () {
      this.$refs.b.setCheckedKeysFun({ label: this.searchText });
    },
    // 修改某个树节点的属性
    setTreeDataValue (treeData, currentNodeId, key, value) {
      const currentNode = this.getTreeData(treeData, currentNodeId);
      if (!currentNode) {
        return;
      }
      // currentNode[key] = value
      this.$set(currentNode, key, value);
    },
    // 添加树结构的数据
    addTreeData (treeData, currentNodeId, data) {
      const currentNode = this.getTreeData(treeData, currentNodeId);
      if (!currentNode) {
        return;
      }
      if (!currentNode.children) {
        currentNode.children = [];
      }
      currentNode.children.push(data);
    },
    // 删除树结构数据
    delTreeData (treeData, currentNodeId) {
      const currentNode = this.getTreeData(treeData, currentNodeId);
      if (!currentNode) {
        return;
      }
      let arr = [];
      if (!currentNode.pId || currentNode.pId.length === 0) {
        arr = treeData;
      } else {
        const parentNode = this.getTreeData(treeData, currentNode.pId);
        arr = parentNode.children;
      }
      const index = arr.findIndex((v) => v.id === currentNodeId);
      arr.splice(index, 1);
    },
    // 删除某个树的节点
    getTreeData (treeData, id) {
      if (!treeData || treeData.length === 0) {
        return;
      }
      let stack = [];
      let item = null;
      treeData.forEach(v => {
        stack.push(v);
      });
      while (stack.length) {
        const result = stack.shift();
        if (result.id === id) {
          item = result;
          return item;
        }
        if (result.children && result.children.length > 0) {
          stack = [...stack, ...result.children];
        }
      }
      return item;
    }
    // let arr = s.match(/./g).filter(v => v === "A"); // 字符串变成数组
  }
};
</script>

<style>
</style>
