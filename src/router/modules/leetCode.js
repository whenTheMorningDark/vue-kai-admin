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
        icon: "chart"
    },
    children: [{
        path: "array",
        component: () =>
            import("@/views/leetCode/index"),
        name: "array",
        meta: { title: "数组", noCache: true },
        children: [{
            path: "array1",
            component: () =>
                import("@/views/leetCode/array/array1"),
            meta: { title: "数组1", noCache: true }
        },
        {
            path: "array2",
            component: () =>
                import("@/views/leetCode/array/array2"),
            meta: { title: "数组2", noCache: true }
        },
        {
            path: "array3",
            component: () =>
                import("@/views/leetCode/array/array3"),
            meta: { title: "数组3", noCache: true }
        },
        {
            path: "array4",
            component: () =>
                import("@/views/leetCode/array/array4"),
            meta: { title: "数组4", noCache: true }
        },
        {
            path: "array5",
            component: () =>
                import("@/views/leetCode/array/array5"),
            meta: { title: "数组5", noCache: true }
        },
        {
            path: "array6",
            component: () =>
                import("@/views/leetCode/array/array6"),
            meta: { title: "数组6", noCache: true }
        },
        {
            path: "array7",
            component: () =>
                import("@/views/leetCode/array/array7"),
            meta: { title: "数组7", noCache: true }
        }
        ]
    }, {
        path: "String",
        component: () =>
            import("@/views/leetCode/index"),
        name: "String",
        meta: { title: "字符串", noCache: true },
        children: [{
            path: "string1",
            component: () =>
                import("@/views/leetCode/String/String1"),
            meta: { title: "字符串1", noCache: true }
        },
        {
            path: "string2",
            component: () =>
                import("@/views/leetCode/String/String2"),
            meta: { title: "字符串2", noCache: true }
        },
        {
            path: "string3",
            component: () =>
                import("@/views/leetCode/String/String3"),
            meta: { title: "字符串3", noCache: true }
        }
        ]
    }]
};
// eslint-disable-next-line eol-last
export default leetCodeRouter;