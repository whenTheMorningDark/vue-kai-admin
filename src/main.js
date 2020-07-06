/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable eol-last */
import Vue from "vue";
import App from "./App.vue";
import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/element-variables.scss";
import store from "./store";
import "@/styles/index.scss"; // global css
import "./icons"; // icon
import "./permission";
import router from "./router";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
import vdr from "vue-draggable-resizable-gorkys";
import contentmenu from "v-contextmenu";
import "v-contextmenu/dist/index.css";

Vue.use(contentmenu);
Vue.component("vdr", vdr);
Vue.config.productionTip = false;
Vue.use(Element);
new Vue({
	render: (h) => h(App),
	router,
	store,
}).$mount("#app");
