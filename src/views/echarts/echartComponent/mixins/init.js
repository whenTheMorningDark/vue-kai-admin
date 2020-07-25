/* eslint-disable indent */
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");

require("echarts/lib/chart/scatter");

require("echarts/lib/chart/radar");

require("echarts/lib/chart/map");

require("echarts/lib/chart/tree");

require("echarts/lib/chart/treemap");

require("echarts/lib/chart/graph");

require("echarts/lib/chart/gauge");

require("echarts/lib/chart/funnel");

require("echarts/lib/chart/parallel");

require("echarts/lib/chart/sankey");

require("echarts/lib/chart/boxplot");

require("echarts/lib/chart/candlestick");

require("echarts/lib/chart/effectScatter");

require("echarts/lib/chart/lines");

require("echarts/lib/chart/heatmap");

require("echarts/lib/chart/pictorialBar");

require("echarts/lib/chart/themeRiver");

require("echarts/lib/chart/sunburst");

require("echarts/lib/chart/custom");

require("echarts/lib/component/grid");

require("echarts/lib/component/polar");

require("echarts/lib/component/geo");

require("echarts/lib/component/singleAxis");

require("echarts/lib/component/parallel");

require("echarts/lib/component/calendar");

require("echarts/lib/component/graphic");

require("echarts/lib/component/toolbox");

require("echarts/lib/component/tooltip");

require("echarts/lib/component/axisPointer");

require("echarts/lib/component/brush");

require("echarts/lib/component/title");

require("echarts/lib/component/timeline");

require("echarts/lib/component/markPoint");

require("echarts/lib/component/markLine");

require("echarts/lib/component/markArea");

require("echarts/lib/component/legendScroll");

require("echarts/lib/component/legend");

require("echarts/lib/component/dataZoom");

// require("echarts/lib/component/dataZoomInside");

// require("echarts/lib/component/dataZoomSlider");

// require("echarts/lib/component/visualMap");

// require("echarts/lib/component/visualMapContinuous");

// require("echarts/lib/component/visualMapPiecewise");

// require("zrender/lib/vml/vml");

// require("zrender/lib/svg/svg");
// 引入提示框和标题组件
// require("echarts/lib/component/tooltip");
// require("echarts/lib/component/title");
export default {
	props: {
		id: [String],
		optionsData: {},
	},
	data() {
		return {
			myChart: null,
		};
	},
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
};