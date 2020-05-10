<script>
/* eslint-disable space-before-function-paren */
/* eslint-disable require-jsdoc */

import draggable from "vuedraggable";
import render from "./components/generator/render";

const components = {
  itemBtns (h, element, index, parent) {
    const { copyItem, deleteItem } = this.$listeners;
    return [
      <span class="drawing-item-copy" title="复制" onClick={event => {
        copyItem(element, parent); event.stopPropagation();
      }} >
        <i class="el-icon-copy-document" />
      </span>,
      <span class="drawing-item-delete" title="删除" onClick={event => {
        deleteItem(index, parent); event.stopPropagation();
      }}>
        <i class="el-icon-copy-document" />
      </span>
    ];
  }
};
const layouts = {
  colFormItem (h, element, index, parent) {
    // layout.call(this, h, this.element, this.index, this.drawingList)
    const { activeItem } = this.$listeners;
    const config = element.__config__;
    let className = this.activeId === config.formId ? "drawing-item active-from-item" : "drawing-item";
    if (this.formConf.unFocusedComponentBorder) {
      className += " unfocus-bordered";
    }
    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
    if (config.showLabel === false) {
      labelWidth = "0";
    }
    return (
      <el-col span={config.span} class={className}
        nativeOnClick={event => {
          activeItem(element); event.stopPropagation();
        }}>
        <el-form-item label-width={labelWidth}
          label={config.showLabel ? config.label : ""} required={config.required}>
          <render key={config.renderKey} conf={element} onInput={event => {
            console.log(event);
            this.$set(config, "defaultValue", event);
          }} />
        </el-form-item>
        {components.itemBtns.apply(this, arguments)}
      </el-col>
    );
  }

};

function layoutIsNotFound () {
  throw new Error(`没有与${this.element.__config__.layout}匹配的layout`);
}

export default {
  components: {
    render,
    draggable
  },
  props: [
    "element",
    "index",
    "drawingList",
    "activeId",
    "formConf"
  ],
  render (h) {
    const layout = layouts[this.element.__config__.layout];
    // console.log(layout)
    if (layout) {
      return layout.call(this, h, this.element, this.index, this.drawingList);
    }
    return layoutIsNotFound.call(this);
  }
};
</script>
