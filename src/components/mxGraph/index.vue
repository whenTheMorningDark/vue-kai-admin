<template>
  <div v-if="graphData && graphData.length>0" ref="container" class="graphContainer" />
</template>

<script>
/* eslint-disable space-before-function-paren */

import {
  mxToolbar as MxToolbar,
  // mxGraphModel as MxGraphModel,
  mxGraph as MxGraph,
  mxCell as MxCell,
  mxGeometry as MxGeometry,
  mxEvent as MxEvent,
  mxUtils as MxUtils,
  mxCellEditor as MxCellEditor
} from "mxgraph/javascript/mxClient";
import methods from "./methods";
import utils from "./utils";
import mxEvent from "./mxEvent";
import HistoryStack from "./history.js";
// const rhombus = require('./images/rhombus.gif')
// const ellipse = require('./images/ellipse.gif')
// const rounded = require('./images/rounded.gif')

export default {
  name: "HelloWorld",
  mixins: [methods, utils, mxEvent],
  props: {
    toolBarIcon: {
      type: Array,
      default: () => []
    },
    graphData: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Function,
      default: () => true
    }
  },
  data () {
    return {
      model: null,
      graph: null,
      mxgraphData: [],
      history: new HistoryStack(20),
      historyData: JSON.parse(JSON.stringify(this.graphData))
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.initGraph();
      this.initToolbar();
      this.initGraphdata(this.graphData);// 初始化图形
      this.setInitFun();
      this.setKeyHandler();
      this.record(this.historyData);
    });
  },
  methods: {
    record (data) {
      this.history.record(JSON.parse(JSON.stringify(data)));
    },
    initGraphdata (data) {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      if (!data || !(data instanceof Array)) {
        return;
      }
      try {
        data.forEach(v => {
          // console.log(v)
          if (!v.to) {
            v.to = [];
          }
          const fakeUUID = () => `${+new Date()}${Math.random()}`;
          const value = v.value ? v.value : "";
          const x = v.x ? v.x : 100;
          const y = v.y ? v.y : 100;
          const width = v.width ? v.width : 100;
          const height = v.height ? v.height : 100;
          const style = v.height ? v.styleOptions : "";
          const id = v.id || null;
          const verter = this.graph.insertVertex(parent, id, value, x, y, width, height, this.convertStyleToString(style));
          // console.log(v)
          // console.log(v.options)
          verter.options = Object.keys(v.options).length > 0 ? v.options : {};
          verter.to = v.to.length > 0 ? v.to : [];
          verter.styleOptions = v.styleOptions || {};
          verter.uuid = fakeUUID();
        });
        this.initEdgeTo();
      } finally {
        this.graph.getModel().endUpdate();
      }
    },
    initEdgeTo () {
      const cells = this.getAllCell();// 所有的图形
      const isHaveTo = cells.some(v => v.to.length > 0);
      if (isHaveTo) {
        cells.forEach(v => {
          const arrTarget = v.to;
          const source = this.findCell(v.id);
          if (arrTarget instanceof Array && arrTarget.length > 0) {
            arrTarget.forEach(s => {
              const target = this.findCell(s.id);
              const style = s.style ? this.convertStyleToString(s.style) : "";
              let edgeOptions = s.edgeOptions || {};
              let id = edgeOptions.id || null;
              let value = edgeOptions.value || "";
              if (!source || !target) {
                return;
              }
              this.graph.insertEdge(this.parent, id, value, source, target, style);
            });
          }
        });
      }
    },
    // this.addToolbarItem(this.graph, toolbar, vertex, icon)
    addToolbarItem (graph, toolbar, prototype, image, v) {
      const funct = (graph, evt, cell, x, y) => {
        const vertex = graph.getModel().cloneCell(prototype);
        vertex.geometry.x = x;
        vertex.geometry.y = y;
        graph.addCell(vertex);
        // const obj = this.getAddObj(vertex)
        // this.mxgraphData.push(obj)
        // console.log(vertex)
        const obj = this.getAddObj(vertex);
        console.log(obj);
        this.graphData.push(obj);
        this.historyData.push(obj);
        console.log(this.historyData);
        this.record(this.historyData);
        graph.setSelectionCell(vertex);
      };
      const img = toolbar.addMode(null, image);
      img.style.display = "inline-block";
      img.style.marginRight = "5px";
      img.width = 16;
      img.height = 16;
      MxEvent.addListener(img, "mousedown", (evt) => {
        if (v.type === "click") {
          this.$emit("clickToolBar", v);
        }
      });
      if (v.type === "draggble") {
        MxUtils.makeDraggable(img, graph, funct);
      }
    },
    initGraph () {
      this.graph = new MxGraph(this.$refs.container);
      this.$refs.container.style.background = "url(" + require("./images/grid.gif") + ")";
      this.graph.setConnectable(true);
      this.graph.stopEditing(false);
      this.graph.setAllowDanglingEdges(false);
      // this.graph.setMultigraph(false);
      this.graph.setAllowLoops(false);
      // console.log(MxCellEditor);
      MxCellEditor.prototype.blurEnabled = true;
    },
    initToolbar () {
      if (this.toolBarIcon.length === 0) {
        return;
      }
      const tbContainer = document.createElement("div");
      tbContainer.style.position = "absolute";
      tbContainer.style.overflow = "hidden";
      tbContainer.style.padding = "2px";
      tbContainer.style.left = "0px";
      tbContainer.style.top = "0px";
      tbContainer.style.width = 100 + "%";
      tbContainer.style.height = "24px";
      tbContainer.style.bottom = "0px";
      tbContainer.style.background = "#f5f7fa";
      this.$refs.container.appendChild(tbContainer);
      // 创建一个mxToolbar
      const toolbar = new MxToolbar(tbContainer);
      const addVertex = (icon, value, w, h, style, options, type) => {
        const vertex = new MxCell(value, new MxGeometry(0, 0, w, h), style);
        vertex.options = options || {};
        vertex.to = [];
        vertex.styleOptions = type.styleOptions || {};
        vertex.setVertex(true);

        this.addToolbarItem(this.graph, toolbar, vertex, icon, type);
      };
      this.toolBarIcon.forEach(v => {
        const style = v.styleOptions ? this.convertStyleToString(v.styleOptions) : "";
        // console.log(style)
        addVertex(v.iconSrc, v.value, v.width, v.height, style, v.options, v);
        // if (v.type === 'draggble') {
        //   addVertex(v.iconSrc, v.value, v.width, v.height, style, v.options, v.type)
        // } else {
        //   console.log('asd')
        //   // this.$emit("click")
        // }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.graphContainer {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>
