**前提:**
在我负责一个模块中，有一个是日志管理模块，它会输出很多很多的操作的日志，起初与后台对接对接的时候并没有考虑到性能渲染问题，只是简单的用 v-for 把所有的数据都渲染出来，那么这样导致的后果就是页面卡顿，这个原因是你的模块中渲染出太多的 DOM 节点导致，为了避免这样的问题我采取了虚拟列表来进行渲染。

**什么是虚拟列表**

虚拟列表就是一个按需渲染的过程，简单来说就是渲染你所看到的内容，对于你非可视的内容不进行渲染，达到性能的优化。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020102616542420.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09ubHlfcnVpd2Vu,size_16,color_FFFFFF,t_70#pic_center)
在图中我们可以看到，你所能看到的就是元素 7 到元素 14 的内容，当我们的滚动条进行滚动的时候，我们只需要通过滚动条的 scrollTop 对 startIndex 和 endIndex 进行改变，此外我们还需要一个 data.length \* itemHeight 的高度容器去撑开外围 DIV,从而去获取滚动条。

实现虚拟列表就是在处理用户滚动时，要改变列表在可视区域的渲染部分，其具体步骤如下：
计算当前可见区域起始数据的 startIndex
计算当前可见区域结束数据的 endIndex
计算当前可见区域的数据，并渲染到页面中
计算 startIndex 对应的数据在整个列表中的偏移位置 startOffset，并设置到列表上
计算 endIndex 对应的数据相对于可滚动区域最底部的偏移位置 endOffset，并设置到列表上

这里的滚动条组件，我是使用 element 中 el-scrollBar 滚动条组件。**我们假设现在每个 item 都是固定的高度值为 30。**

virtualList/index.vue

```javascript
<template>
  <el-scrollbar class="virtualList z-h-100" ref="scrollbar">
    <div class="virtualList-phantom" ref="content" :style="{height:contentHeight}">
      <div class="virtualList-wrapper" ref="wrapper">
        <div
          class="virtualList-phantom-item"
          v-for="item in visibleData" :key="item.id"
          :style="{height:itemHeight+'px'}"
        >
          <!-- <slot ref="slot" :item="item.item"></slot> -->
          <slot ref="slot" :item="item"></slot>
         </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
export default {
  name: "virtualList",
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: Number,
      default: 30
    }
  },
  computed: {
    contentHeight() {
      return this.listData.length * this.itemHeight + "px"; // 计算总高度用来撑开滚动条
    }
  },
  data() {
    return {
      visibleData: [] // 可视的数据
    };
  },
  mounted () {
    this.updateVisibleData();
    this.handleScroll();
  },
  methods: {
    updateVisibleData(scrollTop = 0) {
      const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight);
      const start = Math.floor(scrollTop / this.itemHeight);
      const end = start + visibleCount;
      this.visibleData = this.listData.slice(start, end);
      let pH = start * this.itemHeight;
      this.$refs.content.style.webkitTransform = `translate3d(0, ${-pH}px, 0)`;
      this.$refs.wrapper.style.webkitTransform = `translate3d(0, ${pH * 2}px, 0)`;
    },
    handleScroll() {
      this.$nextTick(() => {
        let scrollbarEl = this.$refs.scrollbar.wrap;
        scrollbarEl.onscroll = () => {
          var st = this.$refs.scrollbar.$refs.wrap.scrollTop; // 滚动条距离顶部的距离
          this.updateVisibleData(st);
        };
      });
    },
  }
};
</script>

<style lang="scss">
.z-h-100{
  height: 100%;
}
.virtualList{
  width:100%;
  height:100%;
  position: relative;
  overflow: hidden;
  border: 1px solid #aaa;
  .virtualList-phantom{
    width:100%;
  }
  .virtualList-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
}
</style>
```

item.vue

```javascript
<template>
  <p>
    <span style="color:red">{{item.id}}</span>
    {{item.value}}
  </p>
</template>


<script>
export default {
  props: {
    // 所有列表数据
    item: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>


<style scoped>
</style>
```

父组件调用

```javascript
<template>
  <div class="virtualListView">
    <virtualList :listData="data" v-slot="slotProps">
      <Item :item="slotProps.item"/>
    </virtualList>
  </div>
</template>

<script>
import virtualList from "@/components/virtualList/index";
import Item from "@/components/virtualList/item";
export default {
  name: "virtualListView",
  components: {
    virtualList,
    Item
  },
  data() {
    return {
      data: Array.from({ length: 3000 }, (k, v) => ({
        date: "2016-05-02" + v,
        name: "王小虎" + v,
        value: "上海市普陀区金沙江路 1518 弄" + v,
        id: v
      }))
    };
  }
};
</script>

<style>
.virtualListView{
  padding:10px;
  height: 100%;
}
</style>
```

通过打开 F12 我们可以发现，你所需渲染的节点，你所看不到的 dom 节点，都会动态的消失和隐藏掉。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201026170534664.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09ubHlfcnVpd2Vu,size_16,color_FFFFFF,t_70#pic_center)
**不定高度的虚拟列表**
由于业务的需求，这个时候每个列表的高度，都是不统一的，有些文字长，有些文字短，那么这种情况就很烦恼了，由于高度不知道，我们无法计算出总高度，那么也无法计算出当前渲染显示出多少个列表元素，为了解决这个问题，我可是撒费了苦心，都不知道查阅了多少资料和熬掉了多少根头发。

我们需要一个 estimatedItemSize 变量去预设置每个列表的高度，为了数据缓存起见，我们需要一个 position 数组来对每个 item 存放它的下标，高度(预设高度或者真实高度)，item 距离顶部的大小，当前列表的总高度。

```javascript
<template>
  <el-scrollbar class="virtualList z-h-100" ref="scrollbar">
      <div ref="list" :style="{height:contentHieghtS+'px'}" class="infinite-list-container">
        <div ref="content" class="infinite-list">
          <div class="infinite-list-item" ref="items" :id="item._index" :key="item._index" v-for="item in visibleData">
            <slot ref="slot" :item="item.item"></slot>
          </div>
      </div>
      </div>
  </el-scrollbar>
</template>


<script>

export default {
  name: "VirtualList",
  props: {
    // 所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    // 预估高度
    estimatedItemSize: {
      type: Number,
      required: true
    },
  },
  computed: {
    _listData() {
      return this.listData.map((item, index) => ({
        _index: `_${index}`,
        item
      }));
    },
    visibleData() { // 可见的数据
      let start = this.start;
      let end = this.end;
      return this._listData.slice(start, end);
    },
    visibleCount() { // 可视区域存放的数量
      return Math.ceil(this.screenHeight / this.estimatedItemSize);
    },
  },
  created() {
    this.initPositions();
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  updated() {
    console.log("updated");
    this.$nextTick(() => {
      if (!this.$refs.items || !this.$refs.items.length) {
        return ;
      }
      // 更新列表总高度
      let height = this.positions[this.positions.length - 1].bottom;
      this.contentHieghtS = height;
    });
  },
  data() {
    return {
      // 可视区域高度
      screenHeight: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: 0,
      contentHieghtS: 0 // 内容撑开的真实高度
    };
  },
  methods: {

    initPositions() {
      this.positions = this.listData.map((d, index) => ({
        index,
        height: this.estimatedItemSize,
        top: index * this.estimatedItemSize,
        bottom: (index + 1) * this.estimatedItemSize
      })
      );
    },
  }
};
</script>


<style  lang="scss">
.z-h-100{
  height: 100%;
}
 .el-scrollbar__wrap{
    overflow-x: hidden !important;
  }
// .virtualList{
//   .el-scrollbar__wrap{
//     overflow-x: hidden;
//   }
// }
.infinite-list-container {
  overflow: hidden;
  position: relative;
  height: 900px;
  // -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}

.infinite-list-item {
  padding: 5px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
/* .infinite-list-scrollItem{
  padding: 5px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
} */

</style>
```

**注意**：列表的最后一项的 bottom 值是当前列表的总高度。虽然目前是能够渲染出来数据，但仍然无法变化到每个 item 的高度，目前他们的高度还是由父组件传递过来的 estimatedItemSize 值(假设 100)，所以我们还需要在 update 生命周期中改变每个列表当前的 height 值，

```javascript
<script>
export default {
  name: "VirtualList",
  props: {
    // 所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    // 预估高度
    estimatedItemSize: {
      type: Number,
      required: true
    },
  },
  computed: {
    _listData() {
      return this.listData.map((item, index) => ({
        _index: `_${index}`,
        item
      }));
    },
    visibleData() { // 可见的数据
      let start = this.start;
      let end = this.end;
      return this._listData.slice(start, end);
    },
    visibleCount() { // 可视区域存放的数量
      return Math.ceil(this.screenHeight / this.estimatedItemSize);
    },
  },
  created() {
    this.initPositions();
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  updated() {
    console.log("updated");
    this.$nextTick(() => {
      if (!this.$refs.items || !this.$refs.items.length) {
        return ;
      }
      // 获取真实元素大小，修改对应的尺寸缓存
      this.updateItemsSize();
      // 更新列表总高度
      let height = this.positions[this.positions.length - 1].bottom;
      this.contentHieghtS = height;
    });
  },
  data() {
    return {
      // 可视区域高度
      screenHeight: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: 0,
      contentHieghtS: 0 // 内容撑开的真实高度
    };
  },
  methods: {
    // 初始化位置
    initPositions() {
      this.positions = this.listData.map((d, index) => ({
        index,
        height: this.estimatedItemSize,
        top: index * this.estimatedItemSize,
        bottom: (index + 1) * this.estimatedItemSize
      })
      );
    },
    // 获取列表项的当前尺寸
    updateItemsSize() {
      let nodes = this.$refs.items;
      nodes.forEach((node) => {
        let rect = node.getBoundingClientRect();
        let height = rect.height;
        let index = +node.id.slice(1);
        let oldHeight = this.positions[index].height;
        let dValue = oldHeight - height;
        // 存在差值
        if (dValue) {
          this.positions[index].bottom = this.positions[index].bottom - dValue;
          this.positions[index].height = height;
          for (let k = index + 1;k < this.positions.length; k++) { // 后面的元素top和bottom也要发生变化
            this.positions[k].top = this.positions[k - 1].bottom;
            this.positions[k].bottom = this.positions[k].bottom - dValue;
          }
        }
      });
    },
  }
};
</script>
```

另外还需要获取可视区域的偏移值，保证可视区域在容器里面

```javascript
<template>
  <el-scrollbar class="virtualList z-h-100" ref="scrollbar">
      <div ref="list" :style="{height:contentHieghtS+'px'}" class="infinite-list-container">
        <div ref="content" class="infinite-list">
          <div class="infinite-list-item" ref="items" :id="item._index" :key="item._index" v-for="item in visibleData">
            <slot ref="slot" :item="item.item"></slot>
          </div>
      </div>
      </div>
  </el-scrollbar>
</template>


<script>

export default {
  name: "VirtualList",
  props: {
    // 所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    // 预估高度
    estimatedItemSize: {
      type: Number,
      required: true
    },
  },
  computed: {
    _listData() {
      return this.listData.map((item, index) => ({
        _index: `_${index}`,
        item
      }));
    },
    visibleData() { // 可见的数据
      let start = this.start;
      let end = this.end;
      return this._listData.slice(start, end);
    },
    visibleCount() { // 可视区域存放的数量
      return Math.ceil(this.screenHeight / this.estimatedItemSize);
    },
  },
  created() {
    this.initPositions();
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
    this.handleScroll();
  },
  updated() {
    console.log("updated");
    this.$nextTick(() => {
      if (!this.$refs.items || !this.$refs.items.length) {
        return ;
      }
      // 获取真实元素大小，修改对应的尺寸缓存
      this.updateItemsSize();
      // 更新列表总高度
      let height = this.positions[this.positions.length - 1].bottom;
      this.contentHieghtS = height;
      // 更新真实偏移量
      this.setStartOffset();
    });
  },
  data() {
    return {
      // 可视区域高度
      screenHeight: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: 0,
      contentHieghtS: 0 // 内容撑开的真实高度
    };
  },
  methods: {
    handleScroll() {
      this.$nextTick(() => {
        let scrollbarEl = this.$refs.scrollbar.wrap;
        scrollbarEl.onscroll = () => {
          var st = this.$refs.scrollbar.$refs.wrap.scrollTop;
          this.scrollEvent(st);
        };
      });
    },
    // 初始化位置
    initPositions() {
      this.positions = this.listData.map((d, index) => ({
        index,
        height: this.estimatedItemSize,
        top: index * this.estimatedItemSize,
        bottom: (index + 1) * this.estimatedItemSize
      })
      );
    },
    // 获取列表项的当前尺寸
    updateItemsSize() {
      let nodes = this.$refs.items;
      nodes.forEach((node) => {
        let rect = node.getBoundingClientRect();
        let height = rect.height;
        let index = +node.id.slice(1);
        let oldHeight = this.positions[index].height;
        let dValue = oldHeight - height;
        // 存在差值
        if (dValue) {
          this.positions[index].bottom = this.positions[index].bottom - dValue;
          this.positions[index].height = height;
          for (let k = index + 1;k < this.positions.length; k++) { // 后面的元素也
            this.positions[k].top = this.positions[k - 1].bottom;
            this.positions[k].bottom = this.positions[k].bottom - dValue;
          }
        }
      });
    },
    // 获取当前的偏移量
    setStartOffset() {
      let startOffset;
      if (this.start >= 1) {
        startOffset = this.positions[this.start - 1].bottom;
      } else {
        startOffset = 0;
      }
      this.$refs.content.style.transform = `translate3d(0,${startOffset}px,0)`;
    },
    // 获取列表起始索引
    getStartIndex(scrollTop = 0) { // 由于数组是有序的可以使用二分法寻找下标
      // 二分法查找
      return this.binarySearch(this.positions, scrollTop);
    },
    binarySearch(list, value) {
      let start = 0;
      let end = list.length - 1;
      let tempIndex = null;

      while (start <= end) {
        let midIndex = parseInt((start + end) / 2, 10);
        let midValue = list[midIndex].bottom;
        if (midValue === value) {
          return midIndex + 1;
        } else if (midValue < value) {
          start = midIndex + 1;
        } else if (midValue > value) {
          if (tempIndex === null || tempIndex > midIndex) {
            tempIndex = midIndex;
          }
          end = end - 1;
        }
      }
      return tempIndex;
    },
    // 滚动事件
    scrollEvent(scrollTop) {
      // 当前滚动位置
      // let scrollTop = this.$refs.list.scrollTop;
      // let startBottom = this.positions[this.start - ]
      // 此时的开始索引
      this.start = this.getStartIndex(scrollTop);
      // 此时的结束索引
      this.end = this.start + this.visibleCount;
      // 此时的偏移量
      this.setStartOffset();
    }
  }
};
</script>
```

其实这个时候留白的区域还是挺多的，所以我们就打算渲染多几个列表，所以我们就借助几个变量

```javascript
computed:{
	 aboveCount() {
      return Math.min(this.start, this.bufferScale * this.visibleCount);
    },
    belowCount() {
      return Math.min(this.listData.length - this.end, this.bufferScale * this.visibleCount);
    },
}
props:{
	// 缓冲区比例
    bufferScale: {
      type: Number,
      default: 1
    },
}
```

[完整的源代码](https://github.com/whenTheMorningDark/vue-kai-admin/blob/master/src/components/virtualList/test.vue)
