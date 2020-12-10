/* eslint-disable comma-dangle */
/* eslint-disable require-jsdoc */
/* eslint-disable indent */
import Vue from "vue";
import Router from "vue-router";

/* Layout */
import Layout from "@/layout";
import component from "./modules/components";

/* Router Modules */
import leetCodeRouter from "./modules/leetCode";

Vue.use(Router);
export const constantRoutes = [
	{
		path: "/redirect",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "/redirect/:path*",
				component: () => import("@/views/redirect/index"),
			},
		],
	},
	{
		path: "/login",
		component: () => import("@/views/login/index"),
		hidden: true,
	},
	{
		path: "/",
		component: Layout,
		redirect: "/dashboard",
		children: [
			{
				path: "dashboard",
				component: () => import("@/views/dashboard/index"),
				name: "Dashboard",
				meta: {
					title: "dashboard",
					icon: "dashboard",
					affix: true,
				},
			},
		],
	},
	{
		path: "/documentation",
		component: Layout,
		redirect: "/documentation/index",
		children: [
			{
				path: "index",
				component: () => import("@/views/documentation/index"),
				name: "Documentation",
				meta: {
					title: "documentation",
					icon: "documentation",
					affix: true,
				},
			},
		],
  },
  {
		path: "/lodash",
		component: Layout,
    redirect: "/loadsh/index",
    meta: {
      title: "lodash",
      icon: "documentation",
      affix: true,
    },
		children: [
			{
				path: "index",
				component: () => import("@/views/loadsh/index"),
				name: "loadsh",
				meta: {
					title: "lodash分析",
					icon: "documentation",
					affix: true,
				},
      },
      {
				path: "array",
				component: () => import("@/views/loadsh/array/index"),
				name: "arrayloadsh",
				meta: {
					title: "数组方法分析",
					icon: "documentation",
					affix: true,
				},
			},
		],
	},
	{
		path: "/game",
		component: Layout,
		redirect: "/documentation/friutGame",
		meta: {
			title: "小游戏合集",
			icon: "documentation",
		},
		children: [
			{
				path: "friutGame",
				component: () => import("@/views/friutGame/index"),
				name: "friutGame",
				meta: {
					title: "水果机",
					icon: "documentation",
					affix: false,
				},
			},
		]
	},
	{
		path: "/table",
		component: Layout,
		meta: {
			title: "表格",
			icon: "chart",
		},
		children: [
			{
				path: "index",
				component: () => import("@/views/editTable/index"),
				name: "editTable",
				meta: {
					title: "可编辑表格",
					icon: "documentation",
				},
			},
			{
				path: "scrollTable",
				component: () => import("@/views/scrollTable/index"),
				name: "scrollTable",
				meta: {
					title: "虚拟表格",
					icon: "documentation",
				},
			},
			{
				path: "adaptiveTable",
				component: () => import("@/views/adaptiveTable/index"),
				name: "adaptiveTable",
				meta: {
					title: "自适应高度table",
					icon: "documentation",
				},
			},
		],
	},
	{
		path: "/dataView",
		component: Layout,
		redirect: "/dataView/index",
		alwaysShow: true, // will always show the root menu
		name: "dataView",
		meta: {
			title: "数据可视化",
			icon: "lock",
			roles: ["admin", "editor"], // you can set roles in root nav
			affix: false,
		},
		children: [
			{
				path: "index",
				component: () => import("@/views/mxgraph/index"),
				name: "mxgraph",
				meta: {
					title: "流程图",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "draggbleLayout",
				component: () => import("@/views/draggbleLayout/index"),
				name: "draggbleLayout",
				meta: {
					title: "拖拽布局",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "echarts",
				component: () => import("@/views/echarts/index"),
				name: "echarts",
				meta: {
					title: "图形可视化",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "form",
				component: () => import("@/views/form/index"),
				name: "formCreator",
				meta: {
					title: "表单可视化",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "gantt",
				component: () => import("@/views/gantt/index"),
				name: "gantt",
				meta: {
					title: "甘特图",
					icon: "documentation",
					affix: false,
				},
			},
			{
				path: "circle",
				component: () => import("@/views/circle/index"),
				name: "circle",
				meta: {
					title: "圆形进度条",
					icon: "documentation",
					affix: false,
				},
			},
		],
	},
	leetCodeRouter,
	component,
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [];

const createRouter = () =>
	new Router({
		// mode: 'history', // require service support
		scrollBehavior: () => ({
			y: 0,
		}),
		routes: constantRoutes,
	});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher; // reset router
}

// eslint-disable-next-line eol-last
export default router;
