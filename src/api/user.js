import request from "@/utils/service";

/**
 * @description 登录接口
 * @param {Object} data 传入的参数
 * @returns {Promise} 返回promise化的request
 */
export function login(data) {
  return request({
    url: "/api/user/login",
    method: "post",
    data
  });
}