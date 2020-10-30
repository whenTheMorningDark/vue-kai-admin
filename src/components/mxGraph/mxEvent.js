/* eslint-disable eol-last */
/* eslint-disable new-cap */
import {
  mxEvent as MxEvent,
  mxUndoManager,
  mxKeyHandler,
  mxClipboard,
  // mxPerimeter
} from "mxgraph/javascript/mxClient";
// 主要处理键盘触发事件
export default {
  mounted () {
    console.log("mixs");
    // this.setKeyHandler()
  },
  methods: {
    setKeyHandler () {
      console.log(this.graph);
      const graph = this.graph;
      const undoManager = new mxUndoManager();
      const listener = function (sender, evt) {
        // console.log(undoManager.undoableEditHappened);
        undoManager.undoableEditHappened(evt.getProperty("edit"));
      };
      graph.getModel().addListener(MxEvent.UNDO, listener);
      graph.getView().addListener(MxEvent.UNDO, listener);
      const keyHandler = new mxKeyHandler(graph);

      // 绑定删除键
      keyHandler.bindKey(46, (evt) => {
        if (graph.isEnabled()) {
          graph.removeCells();
          let veterxs = this.getAllCell();
          veterxs.forEach(v => {
            this.edgeTo(v);
          });
          // this.$confirm("确定删除吗")
          //   .then(res => {
          //     graph.removeCells();
          //     let veterxs = this.getAllCell();
          //     veterxs.forEach(v => {
          //       this.edgeTo(v);
          //     });
          //   })["catch"](cancel => console.log(cancel));
        }
      });
      // 绑定Ctrl+A全选
      keyHandler.bindControlKey(65, function (evt) {
        if (graph.isEnabled()) {
          graph.selectAll();
        }
      });
      // 绑定Ctrl+C复制节点
      keyHandler.bindControlKey(67, function (evt) {
        if (graph.isEnabled()) {
          var cells = graph.getSelectionCells();
          if (cells.length > 0) {
            cells = graph.cloneCells(cells);
            var newCells = [];
            // 修改 cells 中的元素属性
            cells.forEach(function (cell, i) {
              cell.id = "";
              cell.value = (cell.value || "");
              // cell.uid = vm.$utils.uuid()
              newCells.push(cell);
            });
            mxClipboard.setCells(newCells);
            mxClipboard.paste(graph);
          }
        }
      });
      // 绑定Ctrl+Z撤销
      keyHandler.bindControlKey(90, (evt) => {
        if (graph.isEnabled()) {
          undoManager.undo();
          let veterxs = this.getAllCell();
          // let edges = vm.getAllEdge();
          veterxs.forEach(v => {
            this.edgeTo(v);
          });
        }
      });
      // 绑定Ctrl+Y重做
      keyHandler.bindControlKey(89, (evt) => {
        if (graph.isEnabled()) {
          undoManager.redo();
          let veterxs = this.getAllCell();
          veterxs.forEach(v => {
            this.edgeTo(v);
          });
        }
      });

      graph.isCellDeletable = function (cell) {
        return true;
      };
    }
  }
};