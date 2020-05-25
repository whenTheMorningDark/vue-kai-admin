<template>
  <div class="ka-tree-select" style="padding:10px" :style="{width:width+'px'}">
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
        ref="tree-select"
      ></el-tree>
      <div class="ka-select-box" slot="reference">
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
          <transition name="fade-rotate" mode="out-in">
            <i class="el-icon-arrow-down" v-if="!options_show" key="top"></i>
            <i class="el-icon-arrow-up" v-else key="btm"></i>
          </transition>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "treeSelect",
  props: {
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
    size: {
      type: String,
      default: "medium"
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
    }
  },
  data () {
    return {
      value: "",
      data: [{
        id: 1,
        label: "一级 1",
        children: [{
          id: 4,
          label: "二级 1-1",
          children: [{
            id: 9,
            label: "三级 1-1-1"
          }, {
            id: 10,
            label: "三级 1-1-2"
          }]
        }]
      }, {
        id: 2,
        label: "一级 2",
        children: [{
          id: 5,
          label: "二级 2-1"
        }, {
          id: 6,
          label: "二级 2-2"
        }]
      }, {
        id: 3,
        label: "一级 3",
        children: [{
          id: 7,
          label: "二级 3-1"
        }, {
          id: 8,
          label: "二级 3-2"
        }]
      }],
      options_show: false,
      width: 200,
      selecteds: []
    };
  },
  methods: {
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
// 过度效果
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.4s;
}
.fade-in-enter, .fade-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-rotate-enter-active,
.fade-rotate-leave-active {
  transition: all 0.2s;
}
.fade-rotate-enter, .fade-rotate-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: rotateZ(45deg);
}
</style>