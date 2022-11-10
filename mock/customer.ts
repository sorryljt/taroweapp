/*
 * @Author: wanglie
 * @Date: 2022-10-31 14:54:29
 * @LastEditors: wanglie
 * @LastEditTime: 2022-11-07 10:49:48
 * @FilePath: /baishitong/mock/customer.ts
 * @Description: 客户列表+详情
 *
 * Copyright (c) 2022 by wanglie, All Rights Reserved.
 */
export default {
  'GET /customer/list': {
    code: 0,
    data: [
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字,这个名字很长，很长，很长',
        loanAmount: 199900019849,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字',
        loanAmount: 199918,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字',
        loanAmount: 1999,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字',
        loanAmount: 1999394,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字,这个名字很长，很长，很长',
        loanAmount: 199900019849,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字',
        loanAmount: 199918,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字',
        loanAmount: 1999,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字',
        loanAmount: 1999394,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字,这个名字很长，很长，很长',
        loanAmount: 199900019849,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字',
        loanAmount: 199918,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字',
        loanAmount: 1999,
      },
      {
        customerId: 187837823,
        avatar:
          'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
        customerName: '我是名字',
        communityName: '我是公司名字',
        loanAmount: 1999394,
      },
    ],
  },
  'GET /customer/phone': {
    code: 0,
    msg: '描述',
    data: 15822922938,
  },
  'GET /customer/detail': {
    code: 0,
    data:{
      customerName: '王女士',
      avatar: 'https://pic6.58cdn.com.cn/nowater/frs/n_v3a14ad00444e94b5d847c1d8bcc21060b.png',
      companyStatus: 1,
      companyStatusDesc: '有公司',
      creditStatus: 1,
      creditStatusDesc: '良好',
      onlineStatus: 0,
      onlineStatusDesc: '不在线',
      demands: [
        {
          demandId: 19829434034,
          loanAmount: 500000,
          loanTerm: 30,
          marketValue: 566,
          communityName: '我是小区名称，我可能很长很长很长我是小区名称，我可能很长很长很长',
          mortgageStatus: 0,
          mortgageStatusDesc: '有按揭',
          builtYear: '1990',
        },
        {
          demandId: 19829434034,
          loanAmount: 500000,
          loanTerm: 30,
          marketValue: 566,
          communityName: '我是小区名称',
          mortgageStatus: 1,
          mortgageStatusDesc: '有按揭',
          builtYear: '1990',
        },
      ],
    }
  },
};
