<script>
import draggable from "vuedraggable";
// import render from "./components/generator/render";

const layouts = {
  colFormItem (h, element, index, parent) {
    // const { activeItem } = this.$listeners;
    // const config = element.__config__;
    return (
      <el-col>el-col</el-col>
    );
  }
};

export default {
  components: {
    draggable
    // render
  },
  props: [
    "element",
    "index",
    "drawingList",
    "activeId",
    "formConf"
  ],
  render (h) {
    console.log(this);
    console.log(this.element);
    const layout = layouts[this.element.__config__.layout];
    if (layout) {
      return layout.call(this, h, this.element, this.index, this.drawingList);
    }
    return "没有";
    // console.log(h);
    // return h("div", "231232131");
  }
};
</script>