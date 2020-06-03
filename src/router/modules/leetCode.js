/* eslint-disable comma-dangle */
/* eslint-disable indent */
/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const leetCodeRouter = {
	path: "/leetCode",
	component: Layout,
	redirect: "/leetCode/array",
	name: "leetCode",
	meta: {
		title: "leetCode",
		icon: "chart",
		affix: false,
	},
	children: [
		{
			path: "array",
			component: () => import("@/views/leetCode/index"),
			name: "array",
			meta: {
				title: "数组",
				affix: true,
			},
			children: [
				{
					path: "array1",
					name: "数组1",
					component: () => import("@/views/leetCode/array/array1"),
					meta: {
						title: "数组1",
						affix: true,
					},
				},
				{
					path: "array2",
					component: () => import("@/views/leetCode/array/array2"),
					meta: {
						title: "数组2",
					},
				},
				{
					path: "array3",
					component: () => import("@/views/leetCode/array/array3"),
					meta: {
						title: "数组3",
					},
				},
				{
					path: "array4",
					component: () => import("@/views/leetCode/array/array4"),
					meta: {
						title: "数组4",
					},
				},
				{
					path: "array5",
					component: () => import("@/views/leetCode/array/array5"),
					meta: {
						title: "数组5",
					},
				},
				{
					path: "array6",
					component: () => import("@/views/leetCode/array/array6"),
					meta: {
						title: "数组6",
					},
				},
				{
					path: "array7",
					component: () => import("@/views/leetCode/array/array7"),
					meta: {
						title: "数组7",
					},
				},
			],
		},
		{
			path: "String",
			component: () => import("@/views/leetCode/index"),
			name: "String",
			meta: {
				title: "字符串",
			},
			children: [
				{
					path: "string1",
					component: () => import("@/views/leetCode/String/String1"),
					meta: {
						title: "字符串1",
					},
				},
				{
					path: "string2",
					component: () => import("@/views/leetCode/String/String2"),
					meta: {
						title: "字符串2",
					},
				},
				{
					path: "string3",
					component: () => import("@/views/leetCode/String/String3"),
					meta: {
						title: "字符串3",
					},
				},
			],
		},
		{
			path: "BinaryTree",
			component: () => import("@/views/leetCode/index"),
			name: "BinaryTree",
			meta: {
				title: "二叉树",
			},
			children: [
				{
					path: "binaryTree1",
					component: () => import("@/views/leetCode/BinaryTree/BinaryTree1"),
					meta: {
						title: "二叉树1",
					},
				},
				{
					path: "binaryTree2",
					component: () => import("@/views/leetCode/BinaryTree/BinaryTree2"),
					meta: {
						title: "二叉树2",
					},
				},
				{
					path: "binaryTree3",
					component: () => import("@/views/leetCode/BinaryTree/BinaryTree3"),
					meta: {
						title: "二叉树3",
					},
				},
			],
		},
		{
			path: "dynamic",
			component: () => import("@/views/leetCode/index"),
			name: "dynamic",
			meta: {
				title: "动态规划",
			},
			children: [
				{
					path: "maxChildArray",
					name: "动态规划最大子数组",
					component: () => import("@/views/leetCode/dynamic/maxChildArray"),
					meta: {
						title: "动态规划最大子数组",
						affix: false,
					},
				},
				{
					path: "bagQuestion",
					name: "动态规划背包问题",
					component: () => import("@/views/leetCode/dynamic/bagQuestion"),
					meta: {
						title: "动态规划背包问题",
						affix: false,
					},
				},
			],
		},
	],
};
// eslint-disable-next-line eol-last
export default leetCodeRouter;
