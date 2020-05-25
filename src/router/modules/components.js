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
    icon: "component"
  },
  children: [
    {
      path: "treeSelect",
      component: () => import("@/components/treeSelect"),
      name: "treeSelect",
      meta: { title: "下拉选择树" }
    }
  ]
};

export default componentsRouter;
