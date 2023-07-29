/*
 * @Description: axios 的封装
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 14:39:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-07-29 10:40:44
 */
import axios from "axios";

import useAuthStore from "@/store/auth";

import router from "@/router/index";

const authStore = useAuthStore();

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const messageTip = (type, msg) => {
  // eslint-disable-next-line no-undef
  ElMessage({
    message: msg,
    type,
  });
};

// 请求拦截器
service.interceptors.request.use(
  // 在发送请求之前做什么
  function (config) {
    if (authStore.Authorization !== null) {
      config.headers.authorization =
        "Bearer " + authStore.Authorization.slice(1, -1);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 响应拦截器
// TODO：如果返回 401 即 token 过期，退出登录
service.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      messageTip("error", "token 已过期，请重新登录");
      router.push("/loginPage");
    }
  },
);

export default service;
