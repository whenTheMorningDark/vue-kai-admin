class Tree {

  constructor(config = {}) {
    this.defaultConfig = {
      id: "id",
      children: "children",
      pId: "pId"
    };
    this.config = Object.assign(this.defaultConfig, config);
  }

  // 获取某一项的数据
  getData(tree, id) {
    let stack = [];
    let result = {};
    if (Array.isArray(tree) && tree.length > 0) {
      // tree.
      for (let i = 0;i < tree.length;i++) {
        stack.push(tree[i]);
      }
    } else if (typeof tree === "object") {
      stack = [tree];
    }
    while (stack.length) {
      let node = stack.shift();
      if (node[this.config.id] === id) {
        result = node;
        return result;
      }
      if (node[this.config.children] && node[this.config.children].length > 0) {
        stack = stack.concat(node[this.config.children]);
      }
    }
    return result;
  }

  // list=>tree 列表转换成为树
  listToTree(list) {
    let info = list.reduce((map, node) => {
      if (!map[node[this.config.id]]) {
        map[node[this.config.id]] = node;
        node.children = [];
      }
      return map;
    }, {});
    console.log(info);
    return list.filter(v => {
      if (info[v[this.config.pId]]) {
        info[v[this.config.pId]].children.push(v);
      }
      return !v[[this.config.pId]];
    });
  }

  // tree-list 树转变成为列表
  treeToList(tree) {
    const { children } = this.config; const result = [...tree];
    for (let i = 0; i < result.length; i++) {
      if (!result[i][children]) {continue;}
      result.splice(i + 1, 0, ...result[i][children]);
    }
    return result;
  }

  // 删除某个节点
  removeNode(tree, id) {
    let currentNode = this.getData(tree, id);
    if (Object.keys(currentNode).length > 0) {
      let parentNode = currentNode[this.config.pId] ? this.getData(tree, currentNode[this.config.pId]) : tree;
      console.log(parentNode);
      let currentIndex = parentNode[this.config.children] && parentNode[this.config.children].findIndex(v => v[this.config.id] === id);
      currentIndex > -1 && parentNode.children.splice(currentIndex, 1);
    }
  }
}

export default Tree;