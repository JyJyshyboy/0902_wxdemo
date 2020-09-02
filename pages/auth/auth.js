import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handleGetUserInfo(e){        //请求404，支付功能需要企业账号
    const {encryptedData,rawData,iv,signature} = e.detail
    const {code} = await new Promise((resolve,reject)=>{
      wx.login({
        timeout: 10000,
        success:(result) =>{
          resolve(result)
        },
        fail:(err) =>{
          reject(err)
        }
      })
    })
    console.log(code)
    const userInfo = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    }
    const res = await request({url:"/users/wxlogin",data:userInfo,methods:"post"})
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})