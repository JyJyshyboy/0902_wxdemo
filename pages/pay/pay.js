// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  getAddr(){
    const result = wx.getStorageSync('address')
    let address = result.provinceName+result.cityName+result.countyName+result.detailInfo
    let userName = result.userName
    let postalCode = result.postalCode
    let telNumber = result.telNumber
    this.setData({
      address,
      userName,
      postalCode,
      telNumber
    })
  },

  getCart(){
    const cart = wx.getStorageSync('cart')
    cart.filter(v=>v.check===true)
    this.setData({
      cart
    })
  },

  handlePay(){
    const token = wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }else{
      console.log('已经有token了')
    }
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
    this.getAddr()
    this.getCart()
    let {cart} = this.data;
    let totalNum = 0;
    let allPrice = 0;
    cart.forEach(v=>{
      totalNum += v.num
      allPrice += v.goods_price*v.num;
    })
    this.setData({
      totalNum,
      allPrice
    })
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