import request from "@/utils/request";

/**
 *
 * @param {Blob} data 参数
 * @returns {Function} api
 */
export function login (data) {
  return request({
    url: "/vue-element-admin/user/login",
    method: "post",
    data
  });
}

/**
 *
 * @param {Blob} token 参数
 * @returns {Function} api
 */
export function getInfo (token) {
  return request({
    url: "/vue-element-admin/user/info",
    method: "get",
    params: {
      token
    }
  });
}

/**
 *
 * @param {Blob} str 参数
 * @returns {Function} api
 */
export function logout () {
  return request({
    url: "/vue-element-admin/user/logout",
    method: "post"
  });
}
