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
        }
        ]
    }, {
        path: "String",
        component: () =>
            import("@/views/leetCode/String/String1"),
        name: "String",
        meta: { title: "字符串", noCache: true }
    }]
};
// eslint-disable-next-line eol-last
export default leetCodeRouter;