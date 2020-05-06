/* eslint-disable require-jsdoc */
const DRAWING_ID = "idGlobal";
export function getIdGlobal () {
  const str = localStorage.getItem(DRAWING_ID);
  if (str) {
    return parseInt(str, 10);
  }
  return 100;
}