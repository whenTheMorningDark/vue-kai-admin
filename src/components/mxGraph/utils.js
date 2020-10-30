/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable new-cap */
// 主要处理工具函数
export default {
  mounted() {
    console.log("mixs");
    // this.setKeyHandler()
  },
  methods: {
    // 线条edge变成to数组
    edgeTo(source) {
      let edges = source.edges;
      if (edges && edges.length > 0) {
        let arr = []
        edges.forEach(s => {
          let toOptions = {
            edgeOptions: { //  当前线条的属性
              id: s.id, // 当前线条的id
              value: s.value
            },
            id: s.target.id, // 指向target的id
            style: this.StringToObj(s.style) // 当前线条样式
          }
          if (source.id !== s.target.id) {
            arr.push(toOptions)
          }
        })
        source.to = arr
      } else if (edges && edges.length === 0) {
        source.to = []
      }
    },
    StringToObj(str) {
      let targetObj = {}
      if (str && str.includes(";") && str.length > 0) {
        let arr = str.split(";");
        arr.forEach(v => {
          let target = v.split("=")
          if (target[0] && target[0].length > 0 && !targetObj[target[0]]) {
            targetObj[target[0]] = target[1] || ""
          }
        })
      }
      return targetObj
    },
    convertStyleToString(styleDict) {
      // 把对象转成字符{strokeColor:color} => strokeColor=color;
      const style = Object.entries(styleDict)
        .map(([key, value]) => `${key}=${value}`)
        .join(";");
      return `${style};`;
    },
    // 获取id为cell的元素
    findCell(id) {
      const cells = this.graph.getChildVertices(this.graph.getDefaultParent());
      const cell = cells.find(v => v.id === id);
      return cell;
    },
    // 获取所有的图形
    getAllCell() {
      const cells = this.graph.getChildVertices(this.graph.getDefaultParent());

      return cells;
    },
    // 获取所有的线条
    getAllEdge() {
      const edges = this.graph.getChildEdges(this.graph.getDefaultParent())
      // console.log(edges)
      return edges;
    },
    // 获取grapthData
    getGrapthData() {
      const newGraphData = [];
      const currentCell = this.getAllCell();
      // const currentEdge = this.getAllEdge();
      currentCell.forEach(v => {
        const obj = this.getAddObj(v);
        // currentEdge.forEach(s=>{

        // })
        newGraphData.push(obj);
      });
      return newGraphData;
    },
    // 处理连线向to数据添加数据
    handleConnect(edge, source, target) {
      const tId = target.id;
      const sourceTo = source.to.map(v => v.id);
      if (sourceTo.includes(tId)) {
        return;
      }
      source.to.push({
        id: tId,
        style: edge.style,
        edgeOptions: {
          id: edge.id,
          value: edge.value
        }
      });
      console.log(source)
    },
    // 处理value变化的情况
    handleValueChange(cell) {
      console.log(cell);
      if (cell.edge) {
        this.edgeTo(cell.source)
      }
    },
    // 处理undo的json数组
    // handleUnDo(){
    //   const allCell = this.getAllCell();
    // },
    getAddObj(vertex) {
      const {
        id,
        options,
        style,
        to,
        value,
        styleOptions
      } = vertex;
      console.log(id);
      const {
        x,
        y,
        width,
        height
      } = vertex.geometry;
      return Object.assign({
        id,
        options,
        style,
        to,
        value,
        styleOptions
      }, {
        x,
        y,
        width,
        height
      });
    }
  }
};