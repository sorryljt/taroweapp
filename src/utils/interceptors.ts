import Taro from "@tarojs/taro";

// 定义拦截器
const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

const customIntercetor = (chain) => {
  const requestParams = chain.requestParams;
  return chain.proceed(requestParams).then((res) => {
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在");
    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题");
    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data;
    }
  });
};

const interceptors = [customIntercetor, Taro.interceptors.logInterceptor];
export default interceptors;