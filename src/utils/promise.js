/**
 *@description 用于ajax promise化
 *@param {Function} api 接口地址
 *@param {Object} params 传入的参数
 *@returns {Promise} <data>  Promise object
 */
export const utilsPromise = (api, params = {}) => new Promise(resolve => {
  api(params).then(res => {
    if (res.code === 0) {
      resolve(res.data);
    }
  });
});