<template>
  <div class="form">
    <div class="left-board">
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          <div v-for="(item,listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">{{item.title}}</div>
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              draggable=".components-item"
              :sort="false"
              :clone="cloneComponent"
            >
              <div v-for="(element,index) in item.list" :key="index" class="components-item">
                <div class="components-body">{{ element.__config__.label }}</div>
              </div>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 中间区域 -->
    <div class="center-board">
      <div class="action-bar">
        <el-button icon="el-icon-video-play" type="text">运行</el-button>
        <el-button icon="el-icon-view" type="text">查看json</el-button>
        <el-button icon="el-icon-download" type="text">导出vue文件</el-button>
        <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text">复制代码</el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text">清空</el-button>
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form
            :size="formConf.size"
            :label-position="formConf.labelPosition"
            :disabled="formConf.disabled"
            :label-width="formConf.labelWidth + 'px'"
          >
            <draggable
              class="drawing-board"
              :list="drawingList"
              :animation="340"
              group="componentsGroup"
            >
              <DraggableItem
                v-for="(element,index) in drawingList"
                :key="element.renderKey"
                :element="element"
                :index="index"
                :active-id="activeId"
                :form-conf="formConf"
                :drawing-list="drawingList"
                @activeItem="activeFormItem"
              ></DraggableItem>
            </draggable>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {
  inputComponents, selectComponents, layoutComponents, formConf
} from "./components/generator/config";
import drawingDefalut from "./components/generator/drawingDefalut";
import draggable from "vuedraggable";
import DraggableItem from "./DraggableItem";
import { getIdGlobal } from "./components/generator/db";
let tempActiveData;
const idGlobal = getIdGlobal();
export default {
  name: "formCreator",
  components: {
    draggable,
    DraggableItem
  },
  data () {
    return {
      formConf,
      idGlobal,
      drawingList: drawingDefalut,
      activeData: drawingDefalut[0],
      activeId: drawingDefalut[0].formId,
      leftComponents: [
        { title: "输入型组件", list: inputComponents },
        { title: "选择型组件", list: selectComponents },
        { title: "布局型组件", list: layoutComponents }
      ]
    };
  },
  methods: {
    activeFormItem (element) {
      this.activeData = element;
      this.activeId = element.__config__.formId;
    },
    cloneComponent (origin) {
      const clone = JSON.parse(JSON.stringify(origin));
      const config = clone.__config__;
      config.formId = ++this.idGlobal;
      config.span = this.formConf.span;
      config.renderKey = +new Date(); // 改变renderKey后可以实现强制更新组件
      if (config.layout === "colFormItem") {
        clone.__vModel__ = `field${this.idGlobal}`;
        clone.placeholder !== undefined && (clone.placeholder += config.label);
      } else if (config.layout === "rowFormItem") {
        config.componentName = `row${this.idGlobal}`;
        config.gutter = this.formConf.gutter;
      }
      tempActiveData = clone;
      return tempActiveData;
    }
  },
  mounted () {
    this.activeFormItem(this.drawingList[0]);
  }
};
</script>

<style>
</style>