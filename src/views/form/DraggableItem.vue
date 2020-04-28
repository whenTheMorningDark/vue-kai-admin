<script>
import draggable from "vuedraggable";
import render from "./components/generator/render";

const layouts = {
  colFormItem (h, element, index, parent) {
    // const { activeItem } = this.$listeners;
    const config = element.__config__;
    // console.log(this);
    let className = this.activeId === config.formId ? "drawing-item active-from-item" : "drawing-item";
    console.log(className);
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    if (!config.showLabel) {
      labelWidth = "0";
    }
    return (
      <el-col span={config.span} class={className}>
        <el-form-item
          label-width={labelWidth}
          label={config.showLabel ? config.label : ""}
          required={config.required}
        >
          <render key={config.renderKey} conf={element} onInput={event => {
            this.$set(config, "defaultValue", event);
          }}></render>
        </el-form-item>
      </el-col>
    );
  }
};

export default {
  components: {
    draggable,
    render
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