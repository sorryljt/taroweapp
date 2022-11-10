// core
import React, { memo, useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
// components
import { View, Image, Text, Input, Picker, Textarea } from '@tarojs/components'
// utils
import classNames from 'classnames'
import Request from '@/utils/request'

// styles
import styles from './index.module.less'

interface initListType {
  code: string,
  desc: string,
  active?: boolean,
}


const Index: React.FC = () => {
  const [loanProductName, setLoanProductName] = useState<string>('') // 产品名称
  const [organizationName, setOrganizationName] = useState<string>('') // 发布机构
  const [annualInterestRate, setAnnualInterestRate] = useState<string>() // 年利率
  const [repayType, setRepayType] = useState<string>('') // 还款方式
  const [monthPayment, setMonthPayment] = useState<string>() // 月供
  const [grossInterest, setGrossInterest] = useState<string>() // 总利息
  const [processType, setProcessType] = useState<string>() // 办理时效
  const [materialTypesList, setMaterialTypesList] = useState<initListType[]>([]) // 材料列表
  const [repayTypesList, setRepayTypesList] = useState<initListType[]>([]) // 还款方式列表
  const [processTypesList, setProcessTypesList] = useState<initListType[]>([]) // 办理时效列表
  const [recommendReason, setRecommendReason] = useState<string>() // 推荐理由
  const [otherCharge, setotherCharge] = useState<string>() // 附加费用


  const loanProductNameChange = (e: any) => {
    const { value } = e.detail
    if (value.length > 15 || value.length < 2) {
      Taro.showToast({
        title: '请输入2-15位字符',
        icon: 'none',
        duration: 2000
      })
    }
    setLoanProductName(value)
  }

  const trial = async () => {
    const pages = Taro.getCurrentPages()
    const current = pages[pages.length - 1]
    const data = {
      demandId: current?.options?.demandId,
      annualInterestRate,
      repayType: repayTypesList.find((item: any) => item.desc === repayType)?.code
    }
    setMonthPayment('计算中...')
    setGrossInterest('计算中...')
    const res = await Request('/repay/trial', {
      method: 'POST',
      data,
    })
    if (res.code === 0) {
      setMonthPayment(`${res.data.monthPayment}`)
      setGrossInterest(`${res.data.grossInterest}`)
      return
    }
    Taro.showToast({
      title: res.message,
      icon: 'none',
      duration: 2000
    })
  }

  const annualInterestRateChange = (e: any) => {
    const { value } = e.detail
    // 用户输入年利率/还款方式后，月供，总利息更新为计算中...
    setAnnualInterestRate(value)
    if (value && repayType) {
      trial()
    }
  }

  const repayTypeChange = (e: any) => {
    const { value } = e.detail
    setRepayType(repayTypesList[value]?.desc)
    // 用户输入年利率/还款方式后，月供，总利息更新为计算中...
    if (repayTypesList[value]?.desc && annualInterestRate) {
      trial()
    }
  }

  const valueChange = (e: any, setState: any) => {
    const { value } = e.detail
    setState(value)
  }

  const monthPaymentChange = (e: any) => {
    const { value }: {value: string} = e.detail
    if (value.indexOf('首月应还') > -1) {
      const newValue = value.replace('首月应还', '')
      setMonthPayment(newValue)
      return
    }
    setMonthPayment(value)
  }

  const processTypeChange = (e: any) => {
    const { value } = e.detail
    setProcessType(processTypesList[value]?.desc)
  }

  const recommendReasonChange = (e: any) => {
    const { value } = e.detail
    setRecommendReason(value)
  }

  const findItem = () => {
    const code = repayTypesList?.find((item: any) => item.desc === repayType)?.code
    return code
  }

  const materialTypeItemClick = (code: string) => {
    const newArr = materialTypesList?.map((item: initListType) => {
      if (item.code === code) {
        return {
          ...item,
          active: !item.active
        }
      }
      return {
        ...item,
      }
    })
    setMaterialTypesList(newArr)
  }

  const verifyMessage = (name) => {
    Taro.showToast({
      title: `请输入${name}!`,
      icon: 'none',
      duration: 2000
    })
  }

  const submit = async () => {
    // 先校验必填项
    if (!loanProductName) {
      verifyMessage('产品名称')
      return
    }
    if (!annualInterestRate) {
      verifyMessage('年利率')
      return
    }
    if (!repayType) {
      verifyMessage('还款方式')
      return
    }
    if (!monthPayment) {
      verifyMessage('月供')
      return
    }
    if (!grossInterest) {
      verifyMessage('总利息')
      return
    }
    if (!processType) {
      verifyMessage('办理时效')
      return
    }
    if (!recommendReason) {
      verifyMessage('推荐理由')
      return
    }
    if (!otherCharge) {
      verifyMessage('附加费用')
      return
    }
    if (materialTypesList.filter((item: any) => !!item.active).length === 0) {
      verifyMessage('准备材料')
      return
    }
    // 其他校验
    if (loanProductName.length < 2 || loanProductName.length > 15) {
      Taro.showToast({
        title: '产品名称请输入2-15位字符',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const activePrepareMaterialList = materialTypesList?.filter((item: initListType) => !!item.active)
    const pages = Taro.getCurrentPages()
    const current = pages[pages.length - 1]
    const data = {
      loanProductName,
      organizationName,
      annualInterestRate,
      monthPayment,
      grossInterest,
      processType: processTypesList.find((item: initListType) => item.desc === processType)?.code,
      recommendReason,
      otherCharge,
      prepareMaterial: activePrepareMaterialList.map((item: initListType) => item.code),
      repayType: repayTypesList?.find((item: initListType) => item.desc === repayType)?.code,
      demandId: current?.options?.demandId,
      planId: current?.options?.planId,
    }
    Taro.setStorage({ // 把产品名称缓存下来，用于下次进入直接反显
      key: 'loanProductName',
      data: loanProductName
    })
    Taro.showLoading({
      title: '提交中'
    })
    const res = await Request('/plan/publish', {
      method: 'POST',
      data,
    })
    Taro.hideLoading()
    if (res.code === 0) {
      Taro.navigateTo({ url: `/pages/planSuccess/index?planId=${res.data}`})
      return
    }
    Taro.showToast({
      title: res.message,
      icon: 'none',
      duration: 2000
    })
  }

  useEffect(() => {
    Request('/plan/init/list').then((res: any) => {
      if (res.code === 0) {
        setMaterialTypesList(res.data.materialTypes)
        setRepayTypesList(res.data.repayTypes)
        setProcessTypesList(res.data.processTypes)
        // 编辑逻辑
        const pages = Taro.getCurrentPages()
        const current = pages[pages.length - 1]
        if (current?.options?.planId) { // 编辑状态
          Taro.showLoading({
            title: '加载中'
          })
          Request('/plan/detail', {
            method: 'GET',
            data: {
              planId: current?.options?.planId
            }
          }).then((detailRes: any) => {
            Taro.hideLoading()
            if (detailRes.code === 0) {
              setLoanProductName(detailRes.data.loanProductName)
              setOrganizationName(detailRes.data.organizationName)
              setAnnualInterestRate(detailRes.data.annualInterestRate)
              setRepayType(detailRes.data.repayTypeDesc)
              setMonthPayment(detailRes.data.monthPayment)
              setGrossInterest(detailRes.data.grossInterest)
              setProcessType(detailRes.data.processTypeDesc)
              setRecommendReason(detailRes.data.recommendReason)
              setotherCharge(detailRes.data.otherCharge)
              const newArr = res.data.materialTypes.map((item: initListType) => {
                if (detailRes.data.prepareMaterial.includes(item.code)) {
                  return {
                    ...item,
                    active: true
                  }
                }
                return {
                  ...item,
                  active: false
                }
              })
              setMaterialTypesList(newArr)
            }
          })
          return
        }
        setOrganizationName(current?.options?.organizationName)
        setProcessType('1个月')
        Taro.getStorage({ // 如果缓存中有产品名称，则反显
          key: 'loanProductName',
          success: (cacheres: any) => {
            setLoanProductName(cacheres.data)
          }
        })
        return
      }
      Taro.showToast({
        title: res.message,
        icon: 'none',
        duration: 2000
      })
    })
  }, [])

  return (
    <>
      <Image
        className={styles.banner}
        src='https://pic1.58cdn.com.cn/nowater/frs/n_v30ff481eb67d341de95b0156efef60e9f.png'
      />
      <View className={styles.formContent}>
        <View className={styles.formTitle}>我的方案</View>
        <View className={styles.formItem}>
          <View className={styles.formItemLabel}>产品名称</View> 
          <Input
            className={classNames({
              [styles.formItemInput]: true,
              [styles.formItemWeightfont]: !!loanProductName, // 有值时，字体加粗
            })}
            placeholder='请输入产品名称'
            value={loanProductName}
            onInput={loanProductNameChange}
            placeholderStyle='color: #C4CED9'
          />
        </View>
        <View className={styles.formItem}>
          <View className={styles.formItemLabel}>发布机构</View> 
          <View
            className={classNames({[styles.formItemInput]: true, [styles.formItemWeightfont]: true})}
          >{organizationName}</View>
        </View>
        <View className={styles.formItem}>
          <View className={styles.formItemLabel}>年利率(%)</View> 
          <>
            <Input
              className={classNames({
                [styles.formItemInput]: true,
                [styles.formItemWeightfont]: !!annualInterestRate, // 有值时，字体加粗
              })}
              placeholder='请输入年利率'
              type='digit'
              value={annualInterestRate}
              onInput={annualInterestRateChange}
              placeholderStyle='color: #C4CED9'
            />
            {
              annualInterestRate && <Text className={styles.formItemWeightfont}>%</Text>
            }
          </>
        </View>
        <View className={styles.formItem}>
          <View className={styles.formItemLabel}>还款方式</View> 
          <Picker
            mode='selector'
            range={repayTypesList}
            rangeKey='desc'
            onChange={repayTypeChange}
          >
            <View
              className={classNames({
                [styles.formItemInput]: true,
                [styles.formItemWeightfont]: !!repayType,
                [styles.pickerView]: true,
                [styles.pickerPlaceholder]: !repayType,
              })}
            >
                {repayType || '请选择还款方式'}
                <Image
                  src='https://pic1.58cdn.com.cn/nowater/frs/n_v307af5fdf97404fbabe59e11a53c281d2.png'
                  className={styles.selectIcon}
                />
            </View>
          </Picker>
        </View>
        <View className={styles.formItem}>
          <View className={styles.formItemLabel}>
            月供(元)
          </View>
          <Input
            className={classNames({
                [styles.formItemInput]: true,
                [styles.formItemWeightfont]: !!monthPayment, // 有值时，字体加粗
              })}
            placeholder='请输入月供'
            type='digit'
            value={findItem() === 'AP' ? monthPayment && `首月应还${monthPayment}` : monthPayment}
            onInput={monthPaymentChange}
            placeholderStyle='color: #C4CED9'
          />
        </View>
        <View className={styles.formItem}>
          <View className={styles.formItemLabel}>总利息(元)</View> 
          <Input
            className={classNames({
              [styles.formItemInput]: true,
              [styles.formItemWeightfont]: !!grossInterest, // 有值时，字体加粗
            })}
            placeholder='请输入总利息'
            type='digit'
            value={grossInterest}
            onInput={(e) => valueChange(e, setGrossInterest)}
            placeholderStyle='color: #C4CED9'
          />
        </View>
        <View className={styles.formItem}>
          <View className={styles.formItemLabel}>办理时效</View> 
          <Picker
            mode='selector'
            range={processTypesList}
            onChange={processTypeChange}
            rangeKey='desc'
            value={2}
          >
            <View
              className={classNames({
                [styles.formItemInput]: true,
                [styles.formItemWeightfont]: !!processType,
                [styles.pickerView]: true,
                [styles.pickerPlaceholder]: !processType,
              })}
            >
                {processType || '请选择办理时效'}
                <Image
                  src='https://pic1.58cdn.com.cn/nowater/frs/n_v307af5fdf97404fbabe59e11a53c281d2.png'
                  className={styles.selectIcon}
                />
            </View>
          </Picker>
        </View>
        <View className={styles.formTitleTwo}>推荐理由</View>
        <Textarea
          className={styles.reasonInput}
          placeholder='举例：超低利息，适合营业执照满一年的客户'
          placeholderStyle='color: #C4CED9'
          value={recommendReason}
          onInput={recommendReasonChange}
          maxlength={50}
        />
        <View className={styles.formTitleThree}>附加费用</View>
        <Textarea
          className={styles.reasonInput}
          placeholder='举例：评估费xx元，下户费xx元，保险费等'
          placeholderStyle='color: #C4CED9'
          value={otherCharge}
          onInput={(e) => valueChange(e, setotherCharge)}
        />
        <View className={styles.formTitleThree}>准备材料</View>
        <View className={styles.materialTypeContent}>
          {materialTypesList?.map((item: initListType) => {
            return (
              <View
                key={item.code}
                className={classNames({
                  [styles.materialTypeItem]: true,
                  [styles.materialTypeItemActive]: item.active
                })}
                onClick={() => materialTypeItemClick(item.code)}
              >
                {item.desc}
                {
                  item.active && 
                  <Image
                    className={styles.materialTypeItemIcon}
                    src='https://pic1.58cdn.com.cn/nowater/frs/n_v3c002ecbfe4b14ebdb560e14a794ef17e.png'
                  />
                }
              </View>
            )
          })}
        </View>
        <View
          className={classNames({
            [styles.submitBtn]: true,
            [styles.submitBtnActive]: // 所有选项都填写后按钮高亮
            !!loanProductName && !!annualInterestRate && !!repayType
            && !!monthPayment && !!grossInterest && !!processType
            && !!recommendReason && !!otherCharge && materialTypesList.filter((item: any) => !!item.active).length > 0
          })}
          onClick={submit}
        >
          发送方案给客户
        </View>
      </View>
    </>
  )
}

export default memo(Index)