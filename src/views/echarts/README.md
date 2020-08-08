
<h2 align="center">vue中实现ehart图表交互和图表展示</h2>

<p align="center">
  <img src="http://119.23.36.73/githubImages/echarts1.png">
</p>
<p align="center">
  <img src="http://119.23.36.73/githubImages/echarts2.png">
</p>

## 简介
<p>该模块也是平时工作中所负责的一个模块，目的是为了能够快速生成图表。</p>
<p>在实际工作中的项目这是个主要为了绘制大屏所使用，在这里我选择抽了部分的功能与大家一起分享一下,里面的代码或许不是最好的写法，如果你有不同的写法也欢迎分享和提issues</p>

## 技术栈和插件选择
该功能模块技术栈使用了vue,而只要使用到插件则是 echart+[vue-drag-resize](https://github.com/kirillmurashov/vue-drag-resize),echart是一款经典的图形生成库,它内置了许许多多的常见图表，用兴趣的朋友也可以上去官网查看。主要是vue-drag-resize这款插件,项目一开始我是想着自己实现一个可拖拽可伸缩的组件,但随着项目越来越多的需求，发现自己编写的drag-resize越来越多的坑要填，直到我发现这个vue-drag-resize这款插件，这款插件可谓帮了我的大忙,也感谢作者一直在更新和维护。

## 功能要点
<p>目前已完成的功能如下</p>

```
- 图表数据驱动生成(完成)
- 历史记录回撤与前进(完成)
- 图表公用属性编辑(完成)
- 右键删除功能(完成)

```
<p>目前未完成的功能</p>

```
- 右键图表组合,取消组合,上移,下移等功(未完成)
- 组合图层设计(未完成)
- 图表数据联动(未完成)
- 图表刻度尺实现(未完成)
- .....
```

## 公共组件主要代码实现过程

<p>vue实现echart图表是需要一个固定DOM节点的,所以在则必须在生命周期mounted中实现该功能</p>
<p>需要注意的一个是每个图表我都会动态赋值于一个uid，作为图表的唯一标识</p>

```
<div :id="id" style="width:100%;height:100%"></div> 
  methods: {
		resizeFun() {
			this.myChart.resize();
		},
		setOption(optionsData) {
			console.log(optionsData);
			this.myChart.setOption(optionsData);
		},
		init() {
			this.myChart = echarts.init(document.getElementById(this.id));
			this.setOption(this.optionsData);
		},
	},
	mounted() {
		this.init();
	},
```
<p>我在这里也是对外暴露一个setOptions方法，为了后期可以动态设置图表的属性,另外我们是需要额外引入eachrts的图表包，具体代码存放在echartComponent/minxins/init.js中</p>

<p>设置图表的默认的数据，每一个图表类型都拆分开成为一个个单独的文件夹也是为了方便后期的维护,它们的默认数据的来源，我都是从echarts的官网中获取的。</p>
<p>
在编写代码的过程中我一直在思考的如何让进行最简单和最为高效的开发方式，如果每一个每个图表的引入都要业务组件中引入数据，则会变得非常的麻烦，而这个时候我就想到了webpack中的require.context方法，其中思路与动态生成路由组件是一样的，参考代码在echartComponent/data/utils/common.js中。
</p>

## 业务组件主要代码实现过程

<h3>顶部导航栏组件</h3>
<p>该组件只要是用于实现拖拽图表,并且把图表的数据一一暴露出外部组件以供于使用,这里的拖拽我是使用了HTML5拖拽的api进行实现，主要参考代码在于echarts/components/toolbar</p>

```
<el-popover placement="right" title="选择图表" width="800" trigger="hover">
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane
      :label="item.label"
      :name="item.name"
      v-for="(item,index) in listData"
      :key="index"
    >
      <el-row :gutter="20">
        <el-col :span="6" v-for="(element,index) in item.children" :key="index">
          <div class="content-wrapper" @dragstart="drag($event,element)" draggable="true">
            <div class="imgages" v-if="element.images">
              <img :src="element.images" width="100%" height="140" />
            </div>
            <div>{{element.name}}</div>
            </div>
        </el-col>
      </el-row>
      </el-tab-pane>
        </el-tabs>
        <div class="toolbar-item" slot="reference">
          <SvgIcon iconClass="tubiao" class="icon-item"></SvgIcon>
        </div>
      </el-popover>
			import SvgIcon from "@/components/SvgIcon";
			import { barChildren } from "../echartComponent/data/bar/index";
			import { lineChildren } from "../echartComponent/data/line/index";
			import { pieChildren } from "../echartComponent/data/pie/index";
			import { scatterChildren } from "../echartComponent/data/scatter/index";
			import { radarChildren } from "../echartComponent/data/radar/index";
			listData: [
        { name: "bar", label: "柱形图", children: barChildren },
        { name: "line", label: "折线图", children: lineChildren },
        { name: "pie", label: "饼图", children: pieChildren },
        { name: "scatter", label: "散点图", children: scatterChildren },
        { name: "radar", label: "雷达图", children: radarChildren },
      ],
```
<h3>侧边栏组件</h3>
<p>该组件主要是用来修改当前选中图表的基本属性,包括当前的x,y,width,height和基本的echarts图表属性，值得注意的一点是，我们是需要对外暴露setData和getData这两种方法的，换句话来说，我们只需要调用该组件的setData方法就可以了去设置侧边栏所有的属性值。这里就涉及到了不同组件中的通信方式,为了后面的维护,我选择了vuex来作为数据管理。主要代码在store/modules/echart.js。另外，由于我是使用到了element中form表单组件，那么在vuex中使用v-model是需要在计算属性中，重写set和get方法的。而且我们也不可能一一去重写每个属性，这样代码量就太多了。我在这个地方是通过计算属性去动态获取当前currentData,然后去设置当前的属性值。主要参考代码在echarts/rightTool/tabComponents/echartClass中。</p>

## 关于历史记录代码实现

<p>实现历史记录的功能无非就是使用一个栈堆思想，记录当前你所操作的数据，然后push进这个stack中，然后通过步数来对应stack中的下标元素，但值得注意一点就是,当前操作中断后，我们需要删除后续所有的元素。而且在这个过程中我们需要保证数据的不变性,你可以使用JSON.parse(JSON.stringfly(data))的方式去实现数据的深拷贝,我在这个地方就是用loadsh库中cloneDeep函数。主要实现的代码在src/utils/history.js中</p>

## 最后

这个模块,只是我工作中所抽取出来的一下部分,但是核心的思路是不会变，只是会给添加到许多奇奇怪怪的需求上去而已。如果我这个模块对你有所帮助也希望你能点个star,稍微的小小支持一下。

```
如果你有其它的问题或者你有其它更加好的实现方法,也欢迎联系我.
- qq 404792402
```

