// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"",
    userName:"",
    telNumber:"",
    postalCode:"",
    cart:[],
    allPrice:0,
    totalNum:0,
    allCheck:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  handleGetAddr(){          //获取收货地址
    wx.getSetting({
      success:(res1) =>{
        const scopeAddr = res1.authSetting["scope.address"]
        if(scopeAddr===true || scopeAddr===undefined){
          wx.chooseAddress({
            success: (res2) => {
              this.setData({
                address: res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo,
                userName: res2.userName,
                telNumber: res2.telNumber,
                postalCode: res2.postalCode
              })
              wx.setStorageSync('address', res2)
            },
          })
        }else{
          wx.openSetting({   //这个api好像有点问题08/26
            success:(res3) =>{
              wx.chooseAddress({
                success: (res4) => {
                  //console.log(res4)
                },
              })
            }
          })
        }
      }
    })
  }, 

  handleChangeItem(e){       //改变单个商品复选框状态
    const goods_id=e.currentTarget.dataset.id
    let cart = this.data.cart
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].check = !cart[index].check;
    wx.setStorageSync('cart',cart)
    this.setCartData(cart)
  },

  handleChangeAll(){        //改变总商品的复选框状态
    let {cart,allCheck} = this.data
    allCheck = !allCheck;
    cart.forEach(v=>v.check=allCheck)
    this.setCartData(cart)
  },

  getStorageData(){      //获取缓存数据
    let cart = wx.getStorageSync('cart')||[];
    this.setCartData(cart)
  },

  handleNumTool(e){         //点击加减按钮触发事件
    let cart = this.data.cart;
    let {count,id} = e.currentTarget.dataset;
    let index = cart.findIndex(v=>v.goods_id===id)
    cart[index].num += count
    if(cart[index].num<=0){
      cart.splice(index,1)
    }
    wx.setStorageSync('cart', cart)
    this.setCartData(cart)
  },

  handleGoPay(){          //点击跳转支付页面（当有收货地址且有商品时）
    const {totalNum,address} = this.data;
    if(totalNum > 0&& address){
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }else if(totalNum <= 0){
      wx.showToast({
        title: '请添加商品',
      })
    }else{
      wx.showToast({
        title: '请添加收货地址',
      })
    }
  },

  setCartData(cart){       //抽出来设置购物车数据的方法
    let allPrice = 0;
    let totalNum = 0;
    let allCheck = true;
    cart.forEach(v=>{
      if(v.check){
        allPrice += v.goods_price*v.num;
        totalNum += v.num;
      }else{
        allCheck = false
      }
    })
    this.setData({
      cart,
      allPrice,
      totalNum,
      allCheck
    });
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
    this.getStorageData()
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