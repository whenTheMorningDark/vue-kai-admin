/* eslint-disable require-jsdoc */
const DRAWING_ID = "idGlobal";
const DRAWING_ITEMS = "drawingItems";
const FORM_CONF = "formConf";
export function getIdGlobal () {
  const str = localStorage.getItem(DRAWING_ID);
  if (str) {
    return parseInt(str, 10);
  }
  return 100;
}
export function saveIdGlobal (id) {
  localStorage.setItem(DRAWING_ID, `${id}`);
}
export function saveDrawingList (list) {
  localStorage.setItem(DRAWING_ITEMS, JSON.stringify(list));
}
export function getDrawingList () {
  const str = localStorage.getItem(DRAWING_ITEMS);
  if (str) {
    return JSON.parse(str);
  }
  return null;
}
export function getFormConf () {
  const str = localStorage.getItem(FORM_CONF);
  if (str) {
    return JSON.parse(str);
  }
  return null;
}