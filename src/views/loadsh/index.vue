<template>
  <div>lodash</div>
</template>

<script>
import Tree from "@/utils/tree";
export default {
  mounted() {
    let list = [
      {
        id: "1",
        title: "节点1",
        parentId: "",
      },
      {
        id: "1-1",
        title: "节点1-1",
        parentId: "1"
      },

      {
        id: "2",
        title: "节点2",
        parentId: ""
      },
      {id: "2-1", title: "节点2-1", parentId: "2"},
      {id: "1-2", title: "节点1-2", parentId: "1"},
      {id: "1-3", title: "节点1-3", parentId: "1"
      },
      {id: "2-3", title: "节点2-3", parentId: "2"},
      {title: "节点2-3-1", parentId: "2-3", id: "2-3-1"}
    ];
    let treeObj = new Tree({id: "id", pId: "parentId", children: "children"});
    let treeData = treeObj.listToTree(list);
    // treeObj.removeNode(treeData, "1-1");
    // treeObj.removeNode(treeData, "1-3");
    // treeObj.removeNode(treeData, "2-3");
    // let node = {
    //   parentId: "2",
    //   id: "2-4",
    //   children: [],
    //   title: "2-4"
    // };
    // let pnode = {
    //   parentId: "",
    //   id: "3",
    //   children: [],
    //   title: "3"
    // };
    let cnode = {
      parentId: "",
      id: "3",
      children: [],
      title: "3"
    };
    let c1node = {
      parentId: "",
      id: "4",
      children: [],
      title: "34"
    };
    treeObj.insertAfter(treeData, "1", cnode);
    treeObj.insertAfter(treeData, "3", c1node);
    console.log(treeData);
  }
};
</script>

<style>

</style>