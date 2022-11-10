/*
 * @Author: wanglie
 * @Date: 2022-10-28 15:43:00
 * @LastEditors: wanglie
 * @LastEditTime: 2022-11-08 15:04:27
 * @FilePath: /baishitong/src/utils/func.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by wanglie, All Rights Reserved. 
 */
import Taro from "@tarojs/taro";
const passportPlugin = requirePlugin('passportPlugin');
 // 手机号授权登录
const  loginByAuthMobile = (e, callback) => {
    passportPlugin.loginByAuthMobile(
    {
        data: e.detail.encryptedData,
        iv: e.detail.iv,
    },
    res => {
        // wx.showToast({
        // title: '登录成功',
        // icon: 'none',
        // });
        console.log('登录成功喽')
        callback && callback();
    
        // this.successGotoPage('../test/test');
    },
    error => {
        wx.showModal({
        title: '登录失败',
        content: error.msg,
        showCancel: false,
        });
    },
    );
}

const handleTabBarClick = (current)=>{
    console.log('current', current)
    const pathArr = ['/pages/loan/index', '/pages/customer/index','/pages/mine/index'] 
    Taro.redirectTo({
        url: pathArr[current]
    })
}
export {
    loginByAuthMobile, 
    handleTabBarClick
}