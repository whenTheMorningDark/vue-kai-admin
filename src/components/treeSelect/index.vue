<template>
  <div class="ka-tree-select" :style="{width:width+'px'}">
    <el-popover
      :width="width"
      placement="bottom"
      trigger="click"
      v-model="options_show"
      :disabled="false"
    >
      <el-tree
        :data="data"
        :props="selfProps"
        @node-click="handleNodeClick"
        :node-key="nodeKey"
        highlight-current
        :default-checked-keys="checked_keys"
        :default-expanded-keys="checked_keys"
        :show-checkbox="checkbox"
        check-strictly
        ref="tree-select"
      ></el-tree>
      <div class="ka-select-box" slot="reference" :class="[sizeClass]">
        <div class="tag-box">
          <div v-show="selecteds.length>0">
            <template v-if="!collapseTags">
              <el-tag
                closable
                :size="size"
                v-for="item in selecteds"
                :title="item[selfProps.label]"
                :key="item[nodeKey]"
                class="ka-select-tag"
                @close="tabClose(item[nodeKey])"
              >{{ item[selfProps.label] }}</el-tag>
            </template>
            <!-- <template v-else>
              <el-tag
                closable
                :size="size"
                class="ka-select-tag"
                :title="collapseTagsItem[selfProps.label]"
                @close="tabClose(collapseTagsItem[nodeKey])"
              >{{ collapseTagsItem[selfProps.label] }}</el-tag>
              <el-tag
                v-if="this.selecteds.length>1"
                :size="size"
                class="ka-select-tag"
              >+{{ this.selecteds.length-1}}</el-tag>
            </template>-->
          </div>
          <p class="ka-placeholder-box" v-show="selecteds.length===0">请输入内容</p>
        </div>
        <div class="icon-box">
          <i class="el-icon-arrow-down" key="top" :class="{'down':!options_show}"></i>
          <!-- <i class="el-icon-arrow-up" v-else key="btm"></i> -->
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "treeSelect",
  props: {
    // treeData数据
    data: {
      type: Array,
      default: () => []
    },
    // 选中数据
    value: [String, Number, Array, Object],
    // 多选时是否将选中值按文字的形式展示
    collapseTags: {
      type: Boolean,
      default: false
    },
    // 是否可多选
    checkbox: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否只可以选择叶子节点
    isLeaf: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "mini"
    },
    nodeKey: {
      type: String,
      default: "id"
    }
  },
  computed: {
    selfProps () {
      return {
        label: "label",
        children: "children",
        disabled: data => data.disabled,
        ...this.props
      };
    },
    sizeClass () {
      let map = {
        medium: "size-medium",
        small: "size-small",
        default: "size-default",
        mini: "size-mini"
      };
      return map[this.size] || "size-medium";
    }
  },
  created () {
    this.isLeaf && this.changeTreeData(this.data);
    this.handDefaultValue(this.value);
  },
  data () {
    return {
      options_show: false,
      width: 200,
      selecteds: [],
      checked_keys: []
    };
  },
  methods: {
    changeTreeData (data) {
      if (!data) {
        return;
      }
      let stack = [];
      data.forEach(v => {
        stack.push(v);
      });
      while (stack.length) {
        const result = stack.shift();
        if (result.children && result.children.length > 0) {
          result.disabled = true;
          stack = stack.concat(result.children);
        } else {
          result.disabled = false;
        }
      }
      return data;
    },
    // 处理默认选中值
    handDefaultValue (value) {
      // this.$refs["tree-select"].setCurrentNode(value);
      if (!this.checkbox) { // 单选的情况
        this.$nextTick(() => {
          this.$refs["tree-select"].setCurrentNode({
            id: value
          });
          let currentNode = this.$refs["tree-select"].getCurrentNode();
          this.selecteds = [currentNode];
          this.$emit("change", this.selecteds);
        });
      }

      // this.checked_keys = value;
      // console.log(this.checked_keys);
      // if (!value || (Array.isArray(value) && value.length === 0)) {
      //   this.selecteds = [];
      //   this.$nextTick(() => {
      //     this.$refs["tree-select"].setCheckedKeys([]);

      //   });
      // }
    },
    // 点击列表树
    handleNodeClick (item, node) {
      // console.log(data);
      if (this.checkbox) {
        return;
      }
      this.selecteds = [item];
      // this.options_show = false;
      this.$emit("change", this.selecteds);
    },
    // tag标签关闭
    tabClose (id) {
      // if (this.disabled) {
      //   console.log(id);
      // }
      console.log(id);
      if (this.disabled) {
        return;
      }
      if (!this.checkbox) {
        this.selecteds = [];
        this.$refs["tree-select"].setCurrentKey(null);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ka-tree-select {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  outline: none;
  .ka-select-box.size-small {
    height: 32px;
    line-height: 30px;
  }
  .ka-select-box.size-mini {
    height: 28px;
    line-height: 26px;
  }
  .ka-select-box.size-default {
    height: 40px;
    line-height: 38px;
  }
  .ka-select-box {
    display: flex;
    border: 1px solid #dcdfe6;
    padding: 0 5px 0 8px;
    width: 100%;
    // min-height: 36px;
    height: 36px;
    line-height: 34px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    &:focus {
      border-color: #409eff;
    }
    > .tag-box {
      display: inline-block;
      width: calc(100% - 20px);
      text-align: left;
    }

    > .icon-box {
      float: right;
      display: flex;
      width: 20px;
      justify-content: center;
      align-items: Center;
      color: #c0c4cc;
      // transform: rotateZ(45deg);
      .el-icon-arrow-down {
        transition: all 0.2s;
      }
      .down {
        transform: rotateZ(180deg);
      }
    }
    .ka-placeholder-box {
      color: #c0c4cc;
      margin: 0;
    }
    .ka-select-tag {
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-all;
      vertical-align: middle;
    }
    .ka-select-tag + .ka-select-tag {
      margin-left: 4px;
    }
  }
}
// // 过度效果
// .fade-in-enter-active,
// .fade-in-leave-active {
//   transition: all 0.4s;
// }
// .fade-in-enter, .fade-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
//   transform: translateY(-10px);
// }

// .fade-rotate-enter-active,
// .fade-rotate-leave-active {
//   transition: all 0.2s;
// }
// .fade-rotate-enter, .fade-rotate-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   transform: rotateZ(45deg);
// }
</style>