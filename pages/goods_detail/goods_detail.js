import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detail:{},
    isCollection:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  getGoodsDetail(goods_id){
    request({
      url:"/goods/detail",
      data:{goods_id}
    }).then(result =>{
      this.goodsInfo = result.data.message;
      let collection = wx.getStorageSync('collection')||[];
      let isCollection = collection.some(v=>v.goods_id===this.goodsInfo.goods_id)
      this.setData({
        goods_detail: {
          goods_name: result.data.message.goods_name,
          goods_price: result.data.message.goods_price,
          //处理富文本中图片格式为‘.webp’(因为部分iphone手机不识别)
          goods_introduce: result.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics: result.data.message.pics,
          goods_id: result.data.message.goods_id
        },
        isCollection
      })
    })
  },
  
  handleGoCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  goodsInfo:{},
  handleCartAdd(){ 
    let cart=wx.getStorageSync("cart")||[];
    let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    if(index===-1){ //index不存在表示缓存中没有'goods_id'
      this.goodsInfo.num=1;      //在缓存中给cart一个num属性  表示加入购物车数量
      this.goodsInfo.check=true;     //在缓存中给cart一个check属性，表示在购物车页面中复选框的状态
      cart.push(this.goodsInfo);
    }else{          //已经存在
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })
   },

  handleCollection(){
    let {isCollection} = this.data
    let collection = wx.getStorageSync('collection')||[];
    let index = collection.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    if(index===-1){
      isCollection = true;
      collection.push(this.goodsInfo)
      wx.showToast({
        title: '收藏成功',
        icon:'success',
        mask:true
      })
    }else{
      isCollection = false;
      collection.splice(index,1)
      wx.showToast({
        title: '取消成功',
        icon:'success',
        mask:true
      })
    }
    wx.setStorageSync('collection', collection)
    this.setData({
      isCollection
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
    let pages = getCurrentPages();
    let currentPages = pages[pages.length-1];    //pages.length-1表示当前页面，可以拿到options
    let options = currentPages.options;
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
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