class Tree {

  constructor(config = {}) {
    this.defaultConfig = {
      id: "id",
      children: "children",
      pid: "pid"
    };
    this.config = Object.assign(this.defaultConfig, config);
  }

  // list=>tree
  listToTree(list) {
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

    // return list.filter(node => {
    //   info[node.parentId] && info[node.parentId].children.push(node);
    //   return !node.parentId;
    // });

  }
}

export default Tree;