import Taro from '@tarojs/taro'
import Request from '@/utils/request'
import WosSDK from './wos_jssdk_v1'


const getConfig = (token) => {
  return {
    appid: 'EfCbAZyEflh',
    bucket: 'baishitong',
    smallwosurl: 'https://wos.58.com',
    bigwosurl: 'https://wosp2.58.com',
    getAppSign: (callback) => {
      callback(encodeURIComponent(token)); 
    }
  }
}

/**
 * 
 * @param succCallback 上传成功后的回调
 */

export const uploadFile = async (succCallback) => {
  Taro.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    camera: 'front',
    success: (res) => {
      Taro.showLoading({
        title: '上传中',
      })
      Taro.getSystemInfo({
        success: (sysRes) => {
          const _guid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]g/, function (c) {
                const r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })
          };
          const UUID = _guid();
          Taro.getFileInfo({
            filePath: res.tempFiles[0].tempFilePath,
            digestAlgorithm: "sha1",
            success: async (fileRes) => {
              const IMEI = ''
              const MAC = ''
              const AndroidID = ''
              const IDFA = ''
              const openudid = ''
              const brand = sysRes.brand
              const model = sysRes.model
              const system = sysRes.system.split(' ')
              const os = system[0]
              const osver = system[1]
              const ip = ''
              const cpu = ''
              const SdkVersion = '1.0.0'
              const brower = ''
              const BrowserVersion = ''
              const version = sysRes.version
              const wosdevinfo = `${UUID}#${IMEI}#${MAC}#${AndroidID}#${IDFA}#${openudid}#${brand}#${model}#${os}#${osver}#${ip}#${cpu}#${SdkVersion}#${brower}#${BrowserVersion}#${version}`;
              
              const name = res.tempFiles[0].tempFilePath.split('//')[1]
              const nameArr = name.split('.')
              const fileName = `${nameArr[nameArr.length - 2]}_${new Date().getTime()}.${nameArr[nameArr.length - 1]}`

              const wosOptions = {
                filePath: res.tempFiles[0].tempFilePath, // 文件路径
                bucketName: 'baishitong',
                remotePath: fileName, // 文件名作为唯一标识
                ttl: 0, // 文件过期时间
                insertOnly: 1, // 同名文件是否覆盖上传 0:覆盖  1：不覆盖,
                wosdevinfo, // 设备信息，必传
                onUploadSuccess: (wosres: any) => {
                  Taro.hideLoading()
                  if (wosres.code === 0) {
                    succCallback(wosres, fileName, res.tempFiles[0].tempFilePath)
                    return
                  }
                  Taro.showToast({
                    title: wosres.message,
                    icon: 'none',
                    duration: 2000
                  })
                },
                onUploadProgress: () => {}, // 文件上传中回调
                onUploadError: () => { // 文件上传失败回调
                  Taro.showToast({
                    title: '上传失败!',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
              // 获取token
              const tokenRes = await Request('/wos/token/get', {
                method: 'GET',
                data: {
                  fileName
                }
              })
              if (tokenRes.code === 0) {
                const config = getConfig(tokenRes.data)
                const wos = new WosSDK(config)
                wos.upload(fileRes, wosOptions);
              } else {
                Taro.showToast({
                  title: tokenRes.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      })
    }
  })
}