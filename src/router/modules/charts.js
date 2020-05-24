/* eslint-disable indent */
/** When your routing table is too long, you can split it into small modules**/
// eslint-disable-next-line indent

import Layout from "@/layout";

const chartsRouter = {
  path: "/charts",
  component: Layout,
  redirect: "noRedirect",
  name: "Charts",
  meta: {
    title: "charts",
    icon: "chart",
    affix: false
  },
  children: [{
      path: "keyboard",
      component: () => import("@/views/charts/keyboard"),
      name: "KeyboardChart",
      meta: {
        title: "keyboardChart",
        noCache: true,
        affix: false
      }
    },
    {
      path: "line",
      component: () => import("@/views/charts/line"),
      name: "LineChart",
      meta: {
        title: "lineChart",
        noCache: true
      }
    },
    {
      path: "mix-chart",
      component: () => import("@/views/charts/mix-chart"),
      name: "MixChart",
      meta: {
        title: "mixChart",
        noCache: true
      }
    }
  ]
};

export default chartsRouter;