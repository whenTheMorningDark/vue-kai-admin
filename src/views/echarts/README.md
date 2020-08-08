
<h2 align="center">vue中实现ehart图表交互和图表展示</h2>

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

## 主要代码实现过程

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

