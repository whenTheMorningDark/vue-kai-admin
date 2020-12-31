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
  getData (tree, id) {
    let stack = [];
    let result = {};
    if (Array.isArray(tree) && tree.length > 0) {
      // tree.
      for (let i = 0; i < tree.length; i++) {
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

  // 根据id找到parentNode
  findIdParentNode (tree, id) {
    let currentNode = this.getData(tree, id);
    if (Object.keys(currentNode).length > 0) {
      let parentNode = currentNode[this.config.pId] ? this.getData(tree, currentNode[this.config.pId]) : tree;
      return parentNode[this.config.children] ? parentNode[this.config.children] : parentNode;
    }
    return [];
  }

  // list=>tree 列表转换成为树
  listToTree (list) {
    let info = list.reduce((map, node) => {
      if (!map[node[this.config.id]]) {
        map[node[this.config.id]] = node;
        node.children = [];
      }
      return map;
    }, {});
    return list.filter(v => {
      if (info[v[this.config.pId]]) {
        info[v[this.config.pId]].children.push(v);
      }
      return !v[[this.config.pId]];
    });
  }

  // tree-list 树转变成为列表
  treeToList (tree) {
    const { children } = this.config; const result = [...tree];
    for (let i = 0; i < result.length; i++) {
      if (!result[i][children]) {
        continue;
      }
      result.splice(i + 1, 0, ...result[i][children]);
    }
    return result;
  }

  // 删除某个节点
  removeNode (tree, id) {
    let pNode = this.findIdParentNode(tree, id);
    let currentIndex = pNode.findIndex(v => v[this.config.id] === id);
    currentIndex > -1 && pNode.splice(currentIndex, 1);
    // let currentNode = this.getData(tree, id);
    // if (Object.keys(currentNode).length > 0) {
    //   let parentNode = currentNode[this.config.pId] ? this.getData(tree, currentNode[this.config.pId]) : tree;
    //   let parent = parentNode[this.config.children] ? parentNode[this.config.children] : parentNode;
    //   let currentIndex = parent.findIndex(v => v[this.config.id] === id);
    //   currentIndex > -1 && parent.splice(currentIndex, 1);
    // }
  }

  // 插入某个子节点
  insertChildrenNode (tree, pId, node) {
    if (pId) { // 说明的时候某个节点
      let currentNode = this.getData(tree, pId);
      if (Object.keys(currentNode).length > 0) {
        if (!currentNode[[this.config.children]]) {
          currentNode[this.config.children] = [];
        }
        currentNode[this.config.children].push(node);
      }
    } else if (pId === "" || pId === 0 || pId === "0") { // 说明操作的根节点
      tree.push(node);
    }
  }

  // 插入某个节点之后
  insertAfter (tree, sourceId, targetNode) {
    let pNode = this.findIdParentNode(tree, sourceId); // 找出它的父节点
    let sIndex = pNode.findIndex(v => v[this.config.id] === sourceId);
    console.log(pNode);
    if (sIndex > -1) {
      pNode.splice(sIndex + 1, 0, targetNode);
    }
  }
}

export default Tree;