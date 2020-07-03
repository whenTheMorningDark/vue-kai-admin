const componentsContext = require.context("./", true, /.(vue|js)$/);
console.log(componentsContext.keys());
let targetText = componentsContext.keys().map(v => changeStr(v)).filter(v => v !== "index");
// eslint-disable-next-line require-jsdoc
function changeStr(str) {
  return str.substring(2, str.length - 3);
}
let map = {};
targetText.forEach(v => {
  // 获取文件中的 default 模块
  const componentConfig = componentsContext(`./${v}.js`)[v];
  if (!map[v]) {
    map[v] = componentConfig;
  }
});
export default map;