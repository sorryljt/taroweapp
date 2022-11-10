export default {
  cloud: true,
  pages: [
    "pages/outPlan/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  plugins: {
    passportPlugin: {
      "version":"2.5.8",
      "provider":"wxd1d3a59c204109d4"
    }
  },
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示"
    }
  },
  lazyCodeLoading: "requiredComponents",
  quickMenu:{
    "share":false,
    "favorite":false,
    "sendToDesktop":false
  }
};
