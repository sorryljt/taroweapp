

import { Component } from "react";
import Taro, { requirePlugin } from '@tarojs/taro';
// 全局引入一次即可
import 'taro-ui/dist/style/index.scss'
import "./app.scss";

const passportPlugin = requirePlugin('passportPlugin');
class App extends Component {
  componentDidMount() {
   
  }

  componentDidShow() {}

  componentDidHide() {}


  componentDidCatchError() {}
  onLaunch(){
    // passport sdk 初始化
    this.init()
    //  // 获取票据
    this.getTicket('hbgbstAuthTicket')
  }
  init () {
    passportPlugin.init({
      biz: 'hbgbst',
      source: 'hbgbst-hbgbst-weapp',
      pageTitle: '登录',
      defaultLoginType: 0,
      loginType: [0, 1],
      openFindPwdEntries: false,
      // darkblue
      skin: 'orange',
      // 登录成功后自动返回业务方页面，如：使用wx.navigateTo进入登录页面时使用
      autoBack: true,
      // ignoreLocation: true,
      // wh-新用户登录自动注册标识
      autoReg: '1',
      loginSuccessCb: function(pluginWx) {
        // a = true;
        // wx.showToast({
        //   title: '登录成功',
        //   icon: 'none',
        // });
        // 页面跳转操作需使用pluginWx对象
        // pluginWx.redirectTo({
        //   url: '/pages/test/test',
        // });
        
      },
      /* 以下配置，需要使用微信或手机授权登录时必传 */
      // 小程序id
      appid: 'wxee48618de18a8a7c',
      // 获取小程序登录状态码
      getWxLoginCode: function(cb) {
        wx.login({
          success: function(res) {
            if (res.code) {
              return cb && cb(res.code);
            }
            // console.log('小程序登录失败' + res.errMsg);
          },
          fail: function(err) {
            // console.log('小程序登录失败');
          },
        });
      },
      // getWxLoginCode方法回调监控控制，为true时每次调用getWxLoginToken方法时都会掉起初始化参数getWxLoginCode方法的回调
      watchWxToken: false,
      // 授权登录时，触发挑战页面场景使用
      navigateFn: function(url) {
        wx.navigateTo({
          url: url,
          success: function(res) {
          },
          fail: function(res) {
          },
          complete: function(res) {},
        });
      },
      // 成功获取wxcode换回token成功回调，返回token
      getWxTokenSuccessCb: function(token) {
        // wx.showToast({
        //   title: '微信登陆token获取成功：' + token,
        //   icon: 'none',
        // });
      },
      getWxTokenErrorCb: function(err) {
        // wx.showToast({
        //   title: '微信登陆token获取失败：' + err.msg,
        //   icon: 'none',
        // });
      },
      // 授权登陆，新用户绑定方式
      // null:手机号授权登陆（默认）；[0]:账密登陆绑定；[1]:手机号动态码登陆绑定；[0,1]:账密与手机动态码绑定，数组第一位为默认展示方式
      thdBindType: [0],
      // 协议
      protocal: [
        {name: '58同城使用协议', action: '', url: '/pages/protocal/useProtocal/useProtocal'},
        {name: '隐私协议', action: '', url: '/pages/protocal/privacyProtocol/privacyProtocol'}
      ],
    });
  }
   // 获取票据
  getTicket(name) {
    let ticket = passportPlugin.getTicket({
      domain: '58.com',
      name: name,
    });
    if (ticket.code === '0') {
        Taro.setStorageSync(name, ticket.data )
    }
   
  }
  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
