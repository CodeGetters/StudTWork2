/*
 * @Description: axios 的封装
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-21 14:39:04
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-23 17:00:57
 */
import axios from "axios";

import useAuthStore from "../store/auth";
const authStore = useAuthStore();

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

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

export default service;