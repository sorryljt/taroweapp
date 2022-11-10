import { Request, Response } from 'express'

export default {
  'GET /authentication/list': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功',
      data: [
        // {
        //   type: 1, // 1-身份认证；2-企业认证；3-颜值认证
        //   status: 0, // 先不管状态，哪个类型没返回哪个类型就是没认证
        //   id: 999,
        // },
        // {
        //   type: 2,
        //   status: 1, // 先不管状态，哪个类型没返回哪个类型就是没认证
        //   id: 991,
        // },
        {
          type: 3,
          status: 1, // 先不管状态，哪个类型没返回哪个类型就是没认证 0 - 未认证 1- 已认证
          id: 9988,
        }
      ]
    })
  },
  'POST /authentication/idcard/ocr': (req: Request, res: Response) => {
    res.send({
      code: 0,
      data: {
        idCard: '110725199809099001',
        name: '秀琴'
      }
    })
  },
  'POST /authentication/submit': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功',
      data: true
    })
  },
  'GET /corporation/list': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功',
      data: {
        corporationList: [
          {
            id: 5678,
            name: '中国银行北京分行大屯路支行'
          },
          {
            id: 890,
            name: '中国银行北京分行酒仙桥支行'
          },
          {
            id: 234,
            name: '中国银行北京分行'
          },
          {
            id: 90,
            name: '中国银行北京分行'
          },
        ]
      }
    })
  },
  'GET /corporation/detail': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功',
      data: {
        id: 5678,
        email: 'gg@58.com',
        organizationId: 890,
        organizationName: '中国银行北京分行酒仙桥支行',
        status: 0,
      }
    })
  },
  'POST /corporation/verifycode/send': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功',
      data: 'xxxxxxx345678'
    })
  },
  'POST /corporation/verifycode/check': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功'
    })
  },
  'POST /beauty/submit': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功' 
    })
  },
  'GET /beauty/detail': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功',
      data: 'https://pic1.58cdn.com.cn/nowater/frs/n_v23bb5d2b1a9cd429687359e7d3bbeb3af.png'
    })
  },
  'POST /repay/trial': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: 0,
        message: '请求成功',
        data: {
          grossInterest: 2000,
          monthPayment: 200,
        }
      })
    }, 1000)
  },
  'GET /plan/init/list': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功',
      data: {
        repayTypes: [
          {
            code: 'AP',
            desc: '等额本金',
          },
          {
            code: 'AI',
            desc: '等额本息',
          },
          {
            code: 'IF',
            desc: '先息后本',
          },
        ],
        processTypes: [
          {
            code: '1',
            desc: '15个工作日'
          },
          {
            code: '2',
            desc: '20个工作日'
          },
          {
            code: '3',
            desc: '1个月'
          },
          {
            code: '4',
            desc: '2个月'
          },
          {
            code: '5',
            desc: '3个月'
          },
          {
            code: '6',
            desc: '3个月以上'
          },
        ],
        materialTypes: [
          {
            code: '1',
            desc: '身份证'
          },
          {
            code: '2',
            desc: '户口本'
          },
          {
            code: '3',
            desc: '房产证'
          },
          {
            code: '4',
            desc: '婚姻证明'
          },
          {
            code: '5',
            desc: '收入证明'
          },
          {
            code: '6',
            desc: '征信报告'
          },
          {
            code: '7',
            desc: '资金证明用途'
          },
          {
            code: '8',
            desc: '营业执照'
          },
          {
            code: '9',
            desc: '评估报告'
          }
        ]
      }
    })
  },
  'POST /plan/publish': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: 0,
        message: '请求成功',
        data: ''
      })
    }, 500);
  },
  'GET /plan/detail': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: 0,
        message: '请求成功',
        data: {
          loanProductName: '编辑产品名称',
          organizationName: '发布机构',
          annualInterestRate: 1,
          repayType: 'AP',
          repayTypeDesc: '等额本息',
          monthPayment: 200,
          grossInterest: 2999,
          processType: '4',
          processTypeDesc: '2个月',
          recommendReason: '哈哈哈',
          otherCharge: '消费100',
          prepareMaterial: ['5','6','7']
        }
      })
    }, 500)
  },
  'GET /plan/push': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '成功了'
    })
  },
  'GET /wos/token/get': (req: Request, res: Response) => {
    res.send({
      code: 0,
      message: '请求成功',
      data: 'Ylo1TE9yMFpZUjJWK29CQkowWGdQMjg1Ny8wPTplPTE2Njc5ODkyNjgmZj10bXBBNUxESnJhS0ZyWVgyMDdmYmFhZWY0MTc2YjE5NGEyZmM0YTYzZmUxMDIyNV8xNjY3OTg3MzI5NzExLnBuZyZyPTIxMTUzMDA3Nzc%3D'
    })
  }
}
