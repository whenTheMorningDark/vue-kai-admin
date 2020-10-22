最近公司有个新需求,希望能有一个下拉选择树的功能，大概的功能和样式如下所示:
![在这里插入图片描述](https://img-blog.csdnimg.cn/202010221012514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09ubHlfcnVpd2Vu,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201022101850246.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09ubHlfcnVpd2Vu,size_16,color_FFFFFF,t_70#pic_center)

然后我的第一反应就是上 elementui 上找现成的组件，但是挺遗憾的就是 element 并没有提供这样的组件，所以只能自己动手造一个了。

**1. 组件需求**
(1) 支持单选和多选功能
(2) 叶子节点控制是否能选择
(3) 数据回显到选择框支持多选和单选显示
(4) 支持树节点搜索功能
(5) 基本样式应与 elementUi 样式保持一致

**2.布局和样式代码编写**
由于这个地方需要用到弹出下拉框，所以我就借助了 el-popover 来实现这个功能，代码如下:

```javascript
<template>
  <div class="ka-tree-select" :style="{width:width+'px'}">
     <el-popover
        placement="bottom"
        :width="width"
        trigger="click">
    <div class="ka-select-box" slot="reference">
      <div class="tag-box">
        <div v-show="selecteds.length>0">
          显示的内容
        </div>
         <p class="ka-placeholder-box" v-show="selecteds.length===0">请输入内容</p>
      </div>
    </div>
  </el-popover>
  </div>
</template>

<script>
export default {
  name: "treeSelect",
  props: {
    width: {
      type: [String, Number],
      default: 200
    }
  },
  data() {
    return {
      selecteds: [] // 选择到的数据
    };
  }
};
</script>

<style lang="scss" scoped>
  .ka-tree-select{
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
    min-height: 36px;
    // height: 36px;
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
  }
  }
</style>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201022113029483.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09ubHlfcnVpd2Vu,size_16,color_FFFFFF,t_70#pic_center)

样式和基本结构也已经构建好了，值得注意一点就是 HTML 结构中,.tag-box 这个类名容器中会存放所选择到的数据，是用来存放单选和多选的页签。

**3.树结构制作**
这里的树结构我主要使用到了 el-tree 这个组件，为了让它有个好看的滚动条，这里我也选择了 el-scrollBar 滚动条组件，值得一提的就是使用 el-scrollbar 组件时候，必须给父容器添加一个高度，然后 el-scrollBar 的高度为 100%，要不然滚动条为出不来。代码如下:

```javascript
<template>
  <div class="ka-tree-select" :style="{width:width+'px'}">
     <el-popover
        placement="bottom"
        :width="width"
        trigger="click">

    <el-input v-if="filterable" v-model="filterText" :size="size" placeholder="请输入关键词"></el-input>
      <el-scrollbar class="ka-treeselect-popover">
        <el-tree
          :data="data"
          :props="selfProps"

          :node-key="nodeKey"
          highlight-current
          :default-checked-keys="checked_keys"
          :default-expanded-keys="expandedKeys"
          :show-checkbox="checkbox"
          check-strictly
          ref="tree-select"
          :filter-node-method="filterNode"
        ></el-tree>
        <!-- @check="handleCheckChange" -->
        <!-- @node-click="handleNodeClick" -->
      </el-scrollbar>

    <div class="ka-select-box" slot="reference">
      <div class="tag-box">
        <div v-show="selecteds.length>0">
          显示的内容
        </div>
         <p class="ka-placeholder-box" v-show="selecteds.length===0">请输入内容</p>
      </div>
    </div>
  </el-popover>
  </div>
</template>

<script>
export default {
  name: "treeSelect",
  props: {
    width: { // 宽度
      type: [String, Number],
      default: 200
    },
    size: { // 尺寸
      type: String,
      default: "mini"
    },
    data: { // 树结构的数据
      type: Array,
      default: () => []
    },
    nodeKey: { // 树结构的唯一标识
      type: String,
      default: "id"
    },
    // 是否使用搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 显示的字段
    props: {
      type: Object,
      default: () => ({
        label: "label",
        children: "children",
      })
    },
    // 是否可多选
    checkbox: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      selecteds: [], // 选择到的数据
      checked_keys: [], // 默认选中的数据
      expandedKeys: [], // 默认展开的数据
      filterText: "" // 筛选的数据
    };
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
  },
  methods: {
    // 树节点筛选
    filterNode (value, data) {
      if (!value) {
        return true;
      }
      return data[this.selfProps.label].indexOf(value) !== -1;
    }
  },
  watch: {
    filterText (val) {
      this.$refs["tree-select"].filter(val);
    }
  }
};
</script>

<style lang="scss" scoped>
  .ka-tree-select{
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
    min-height: 36px;
    // height: 36px;
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
  }
  }
  .ka-treeselect-popover {
  height: 360px;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201022115254160.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09ubHlfcnVpd2Vu,size_16,color_FFFFFF,t_70#pic_center)
**4.处理显示的值**
接下来的话就轮到控制显示输入框的值了，我们要考虑一点，作为公共组件是如何提供给业务组件使用的问题，我假设在业务组件 A 中，使用了这个值，并且期望它的使用方式如下:

```javascript
<template>
  <div style="padding:10px">
    <el-row>
      <el-col :span="12">
        <treeSelect :data="treeData" v-model="select" checkbox :width="500" ref="treeSelect" ></treeSelect>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import treeSelect from "@/components/treeSelect/test";
export default {
  components: {
    treeSelect
  },
  data () {
    return {
      treeData: [{
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
        }, {
          id: 18,
          label: "二级 3-2"
        }, {
          id: 82,
          label: "二级 3-2"
        }, {
          id: 84,
          label: "二级 3-2"
        }, {
          id: 842,
          label: "二级 3-2"
        }, {
          id: 847,
          label: "二级 3-2"
        }]
      },
      {
        id: 11,
        label: "最外面"
      }
      ],
      select: [9, 5]
    };
  }
};
</script>

<style>
</style>
```

select 这个变量代表我选中了这两个节点，还可以默认展开，并且是在输入框中显示所对应的 label 值，那么就回到 treeSelect 组件中编写对应的逻辑。在 created 中定义处理默认值的方法 handDefaultValue

```javascript
 // 处理默认值的方法
    handDefaultValue(value) {
      if (!Array.isArray(value) || value.length === 0) {
        return;
      }
      this.expandedKeys = [];
      if (!this.checkbox) { // 单选的情况
        this.$nextTick(() => {
          this.$refs["tree-select"].setCurrentNode({
            id: value[0]
          });
          let currentNode = this.$refs["tree-select"].getCurrentNode();
          this.expandedKeys.push(value[0]);
          this.selecteds = [currentNode];
          this.$emit("change", this.selecteds);
        });
      } else { // 多选的情况
        this.$nextTick(() => {
          this.$refs["tree-select"].setCheckedKeys(value);
          let currentAllNode = this.$refs["tree-select"].getCheckedNodes();
          value.forEach(v => {
            this.expandedKeys.push(v);
          });
          this.selecteds = currentAllNode;
          this.$emit("change", this.selecteds);
        });
      }
    }
```

这个时候我们的 selecteds 数组中已经初始化了选中当前树节点的数据，这个时候我们只需要把树节点对应的 label 渲染出来即可，这里我使用到 el-tag 这个组件，我把文字的显示分成了两种情况一种是平铺展示，一种折叠显示，代码如下:

```javascript
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
            <template v-else>
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
            </template>
```

此时完整的代码：

```javascript
<template>
  <div class="ka-tree-select" :style="{width:width+'px'}">
     <el-popover
        placement="bottom"
        :width="width"
        trigger="click">

    <el-input v-if="filterable" v-model="filterText" :size="size" placeholder="请输入关键词"></el-input>
      <el-scrollbar class="ka-treeselect-popover">
        <el-tree
          :data="data"
          :props="selfProps"

          :node-key="nodeKey"
          highlight-current
          :default-checked-keys="checked_keys"
          :default-expanded-keys="expandedKeys"
          :show-checkbox="checkbox"
          check-strictly
          ref="tree-select"
          :filter-node-method="filterNode"
        ></el-tree>
        <!-- @check="handleCheckChange" -->
        <!-- @node-click="handleNodeClick" -->
      </el-scrollbar>

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
            <template v-else>
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
            </template>
        </div>
         <p class="ka-placeholder-box" v-show="selecteds.length===0">请输入内容</p>
      </div>
    </div>
  </el-popover>
  </div>
</template>

<script>
export default {
  name: "treeSelect",
  props: {
    width: { // 宽度
      type: [String, Number],
      default: 200
    },
    size: { // 尺寸
      type: String,
      default: "mini"
    },
    data: { // 树结构的数据
      type: Array,
      default: () => []
    },
    nodeKey: { // 树结构的唯一标识
      type: String,
      default: "id"
    },
    // 是否使用搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 显示的字段
    props: {
      type: Object,
      default: () => ({
        label: "label",
        children: "children",
      })
    },
    // 是否可多选
    checkbox: {
      type: Boolean,
      default: false
    },
    // 选中数据
    value: [Array],
    // 多选时是否将选中值按文字的形式展示
    collapseTags: {
      type: Boolean,
      default: false
    },
  },
  created () {
    this.handDefaultValue(this.value);
  },
  data() {
    return {
      selecteds: [], // 选择到的数据
      checked_keys: [], // 默认选中的数据
      expandedKeys: [], // 默认展开的数据
      filterText: "" // 筛选的数据
    };
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
  },
  methods: {
    // 树节点筛选
    filterNode (value, data) {
      if (!value) {
        return true;
      }
      return data[this.selfProps.label].indexOf(value) !== -1;
    },
    // 处理默认值的方法
    handDefaultValue(value) {
      if (!Array.isArray(value) || value.length === 0) {
        return;
      }
      this.expandedKeys = [];
      if (!this.checkbox) { // 单选的情况
        this.$nextTick(() => {
          this.$refs["tree-select"].setCurrentNode({
            id: value[0]
          });
          let currentNode = this.$refs["tree-select"].getCurrentNode();
          this.expandedKeys.push(value[0]);
          this.selecteds = [currentNode];
          this.$emit("change", this.selecteds);
        });
      } else { // 多选的情况
        this.$nextTick(() => {
          this.$refs["tree-select"].setCheckedKeys(value);
          let currentAllNode = this.$refs["tree-select"].getCheckedNodes();
          value.forEach(v => {
            this.expandedKeys.push(v);
          });
          this.selecteds = currentAllNode;
          this.$emit("change", this.selecteds);
        });
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs["tree-select"].filter(val);
    }
  }
};
</script>

<style lang="scss" scoped>
  .ka-tree-select{
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
    min-height: 36px;
    // height: 36px;
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
  .ka-treeselect-popover {
  height: 360px;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
```

这个时候只需关注点击树节点所触发的函数，点击树节点 el-checkBox 和关闭 el-tag 时的函数即可。

```javascript
// 点击checkbox变化
    handleCheckChange (val) {
      let nodes = this.$refs["tree-select"].getCheckedNodes(false);
      this.selecteds = nodes;
      this.$emit("change", this.selecteds);
    },
    // 点击列表树
    handleNodeClick (item, node) {
      if (this.checkbox) {
        return;
      }
      this.selecteds = [item];
      // this.options_show = false;
      this.$emit("change", this.selecteds);
    },
    // tag标签关闭
    tabClose (id) {
      if (this.disabled) {
        return;
      }
      if (!this.checkbox) { // 单选
        this.selecteds = [];
        this.$refs["tree-select"].setCurrentKey(null);
      } else { // 多选
        this.$refs["tree-select"].setChecked(id, false, true);
        this.selecteds = this.$refs["tree-select"].getCheckedNodes();
      }
      this.$emit("change", this.selecteds);
    },
```

那么最后还有最后一个小的功能点，就是实现只能选择叶子节点的功能，那么我们就定义一个变量 isLeaf 来进行标识。在 el-tree 中只需要给节点添加上 disabled 字段即可标识当前节点是否可选了，那么我们只需要遍历这个树节点，循坏遍历，判断当前节点的 children 字段是否是大于 0，大于 0,disable 则为 true。

```javascript
// 转换treedata
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
created(){
	this.isLeaf && this.changeTreeData(this.data);
}
```

这个时候已经完成了下拉选择树的功能，功能要点如下:
(1) 支持单选和多选功能
(2) 叶子节点控制是否能选择
(3) 数据回显到选择框支持多选和单选显示
(4) 支持树节点搜索功能
(5) 基本样式应与 elementUi 样式保持一致

源码地址为:https://github.com/whenTheMorningDark/vue-kai-admin/blob/master/src/components/treeSelect/index.vue
