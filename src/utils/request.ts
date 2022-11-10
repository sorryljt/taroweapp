import Taro from '@tarojs/taro'
import interceptors from "./interceptors";

interface RequestOption {
  data?: any,
  header?: any,
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
}
// 请求前缀
const prefix = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:9527' : '' // 本地模式走mock, 生产/测试走后端服务  可改

// 封装http请求
interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));
// 百事通有申请自己bizId 需关注
let defaultHeaders:any = {
  "cache-control": "no-cache",
  // "referer-url": window.location.href,
  "Content-Type": "application/json; charset=utf-8",
  // bizId: 2,
  loginBizId: '19', // 安居客和小程序：2，三网经纪人：6,58:1
  Accept: "application/json",
  "channel-from": "baishitong",
  Cookie: `hbgbstAuthTicket=${Taro.getStorageSync('hbgbstAuthTicket')?.hbgbstAuthTicket}`
}
function httpRequest (url: string, options?: RequestOption): Promise<any> {
  const { header, data, method } = options || {}
  const commonHeaders = Object.assign(defaultHeaders, header || {});
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${prefix}${url}`,
      data,
      method: method || 'GET',
      header: commonHeaders,
      success(res) {
        resolve(res.data)
      },
      fail: function () {
        Taro.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    })
  })
}

export default httpRequest;
