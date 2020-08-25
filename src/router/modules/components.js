/* eslint-disable indent */
/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const componentsRouter = {
	path: "/components",
	component: Layout,
	redirect: "noRedirect",
	name: "组件合集",
	meta: {
		title: "components",
		icon: "component",
	},
	children: [
		{
			path: "treeSelect",
			component: () => import("@/views/treeSelect"),
			name: "treeSelect",
			meta: {
				title: "下拉选择树",
			},
		},
		{
			path: "sku",
			component: () => import("@/views/sku/index.vue"),
			name: "sku商品列表",
			meta: {
				title: "sku商品列表",
			},
		},
		{
			path: "nestMenu",
			component: () => import("@/views/nestMenu/index.vue"),
			name: "递归组件",
			meta: {
				title: "递归组件",
			},
		},
	],
};

export default componentsRouter;
