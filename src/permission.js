import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({
  showSpinner: false
}); // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const accessRoutes = await store.dispatch("permission/generateRoutes", []);
  router.addRoutes(accessRoutes);
  next();
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});