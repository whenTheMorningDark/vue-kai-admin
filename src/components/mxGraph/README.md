## 简介

该项目主要是我个人在工作中所编写的一些组件或者是有一些有意思的组件我都会一一记录下来

## 封装 mxGraph 组件

mxgraph 是一个非常强大的一个绘图库，但是我个人认为它是比较难用的，而且原本库数据传递的方法都是 xml 格式的，这种格式我个人是不太喜欢的，所以我就基于 mxgraph 二次封装成为一个数据驱动的一个组件

最近公司需要使用 mxgraph，来进行流程图的开发，由于我是第一次接触这个库，所以踩到的坑还是挺多，最坑爹的网上关于这个库的资料实在是太少了，它的文档还是英文文档。所以开发起来还是有点痛苦的。
我们来看下以下部分需求：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019041115472592.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09ubHlfcnVpd2Vu,size_16,color_FFFFFF,t_70)
这是 PM 要我做的流程图，这里我会拿部份的功能和大家分享。包括新建图形，删除节点图形，响应右键菜单事件....由于 mxgraph 的套路是很固定的，只要你 GET 到这几个部分再结合文档，就基本没有问题了。

**一.创建项目**
通过 vue-cli 创建项目，这里就不多说了....，这是我生成的项目目录。我进行了一个项目目录的修改，大家也可以参考一下。
vue.config.js 配置

```javascript
module.exports = {
	publicPath: "./",
	outputDir: "dist",
	lintOnSave: true,
	chainWebpack: (config) => {
		config.module
			.rule("")
			.test(/mxClient\.js$/)
			.use("exports-loader")
			.loader(
				"exports-loader?mxClient,mxToolbar,mxConnectionHandler,mxEllipse,mxConnectionConstraint,mxWindow," +
					"mxObjectCodec,mxGraphModel,mxActor,mxPopupMenu,mxShape,mxEventObject,mxGraph,mxPopupMenuHandler,mxPrintPreview," +
					"mxEventSource,mxRectangle,mxVertexHandler,mxMouseEvent,mxGraphView,mxCodecRegistry,mxImage,mxGeometry," +
					"mxRubberband,mxConstraintHandler,mxKeyHandler,mxDragSource,mxGraphModel,mxEvent,mxUtils,mxEvent,mxCodec,mxCell," +
					"mxConstants,mxPoint,mxGraphHandler,mxCylinder,mxCellRenderer,mxEvent,mxUndoManager"
			)
			.end();
	},
};
```

**二.数据驱动生成图形**

在项目开发的过程中，我使用了 mxGraph 踩了很多的坑，其中的一个大坑就是图形回显的问题，一开始我是采用官方推荐的 xml 形式,大致上就是前台生成一堆的 xml,然后后台返回。这里的问题是什么呢？就是后台的小伙伴就会很繁琐，毕竟他们要从一大堆没有规律的 xml 抽取字段，然后写进数据库。所以，我就把数据格式修改为 json 格式，我个人认为这是使用 mxGraph 最为重要的一个东西。

首先我们就先约定好数据格式

```javascript
graphData: [
        { id: "5", value: "开始", styleOptions: { shape: "rectangle", strokeColor: "#662B2B", dashed: "0", strokeWidth: 1 }, x: 100, y: 100, width: 100, height: 100,
          to: [
            { id: "7", style: { strokeColor: "red", edgeStyle: "orthogonalEdgeStyle", rounded: 0, orthogonalLoop: 1 }, edgeOptions: { id: "25", value: "8888" } },
            { id: "9", edgeOptions: { id: "35", value: "9999" } }], options: { name: "add", type: "start" }
        },
        { id: "7", value: "结束1", styleOptions: {shape: "cylinder"}, x: 500, y: 400, width: 100, height: 100, to: [], options: { name: "add", type: "rounded" } },
        { id: "9", value: "结束2", styleOptions: {shape: "cylinder", strokeWidth: 2, fillColor: "#ffffff", strokeColor: "black", backgroundOutline: 1, size: 15, rounded: 1}, x: 600, y: 500, width: 100, height: 100, to: [], options: { name: "add", type: "ellipse" } }
      ],
```

让我为 graphData 中的数据每一项做个简单的说明:
| id | 每个图形唯一的标识|
|--|--|
| value | 图形的 label 值|
| styleOptions | 图形的基本样式 |
| x | 图形的 x 轴距离|
| y | 图形的 y 轴距离|
| width | 图形的宽度|
| height | 图形的高度|

每一项的 to 作为一个数组，关联于它下面的一个节点，说明说明
| id | 目标元素的 id|
|--|--|
| options | 线条额外的属性 |
| styleOptions | 线条的样式 |

使用的方式可以[参考地址](https://github.com/whenTheMorningDark/vue-kai-admin/blob/master/src/views/mxgraph/index.vue)

**三.自定义连线规则**

在实际项目中我们需要判断那些图形可连可不连，那么我们需要在每个图形中做手脚，我们在在每个图形 options 对象中添加相对应的 type 属性，实际上，这个 options 就是专门为我们去做自定义的事情。

另外自定义的检验函数为 rules,

```javascript
// 自定义是否连线规则
    rules (source, target) {
      return true;
    }
```

函数会返回两个参数，分别是来源和目标你可以根据这两个 type 来判断可联可不联。

**4.目前功能**

目前完善的功能点如下:

1.  数据驱动生成图形
2.  删除图形
3.  前进和后退图形
4.  自定义校验函数
5.  自定义图形

未来功能点: 1.导出功能(图片) 2.放大缩小
.......

**五.组件链接**

组件的 github 链接[mxGraph 组件](https://github.com/whenTheMorningDark/vue-kai-admin/tree/master/src/components/mxGraph)
