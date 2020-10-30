<template>
  <div v-if="graphData && graphData.length>0" ref="container" class="graphContainer" />
</template>

<script>
/* eslint-disable space-before-function-paren */

import {
  // mxGraphModel as MxGraphModel,
  mxGraph as MxGraph,
  // mxCell as MxCell,
  // mxGeometry as MxGeometry,
  // mxEvent as MxEvent,
  // mxUtils as MxUtils
} from "mxgraph/javascript/mxClient";
import methods from "./methods";
import utils from "./utils";
import mxEvent from "./mxEvent";

// const rhombus = require('./images/rhombus.gif')
// const ellipse = require('./images/ellipse.gif')
// const rounded = require('./images/rounded.gif')

export default {
  name: "HelloWorld",
  mixins: [methods, utils, mxEvent],
  props: {
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
      graph: null,
      historyData: JSON.parse(JSON.stringify(this.graphData)),
      parent: null,
      model: null
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.initGraph();
      this.initGraphdata(this.graphData);// 初始化图形
      this.setInitFun();
      this.setKeyHandler();
    });
  },
  methods: {
    initGraphdata (data) {
      this.graph.getModel().beginUpdate();
      if (!data || !(data instanceof Array)) {
        return;
      }
      try {
        data.forEach(v => {
          this.createVerter(v);
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
              let edges = this.graph.insertEdge(this.parent, id, value, source, target, style);
              edges.options = s.options || {};
            });
          }
        });
      }
    },
    initGraph () {
      this.graph = new MxGraph(this.$refs.container);
      this.parent = this.graph.getDefaultParent();
      // this.model = new MxGraphModel();
      this.$refs.container.style.background = "url(" + require("./images/grid.gif") + ")";
      this.graph.setConnectable(true);
      this.graph.stopEditing(false);
      this.graph.setAllowDanglingEdges(false);
      // this.graph.setMultigraph(false);
      this.graph.setAllowLoops(false);
      // console.log(MxCellEditor);
      // MxCellEditor.prototype.blurEnabled = true;
    },
  }
};
</script>
<style lang="scss" scoped>
.graphContainer {
  width: 100%;
  height: calc(100vh - 50px);
}
</style>
