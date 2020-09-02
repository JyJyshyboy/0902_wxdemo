import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    categoryList:[],
    floorList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getSwiperList(),
     this.getCategoryList(),
     this.getFloorList()
  },

  
  getSwiperList(){ //获取轮播数据
    request({url:"/home/swiperdata"})
    .then(result => {
      let swiperList = result.data.message
      swiperList.forEach(v =>{      //给轮播的每个对象添加url属性(请求的路径有误)，并带上参数goods_id       
        v.url = "/pages/goods_detail/goods_detail?goods_id=" + v.goods_id
      })
      this.setData({
        swiperList
      })
    })
  },

  getCategoryList(){ //获取分类数据
    request({url:"/home/catitems"})
    .then(result =>{
        this.setData({
        categoryList: result.data.message
      })
    })
  },

  getFloorList(){    //获取楼层数据
    request({url:"/home/floordata"})
    .then(result =>{
        this.setData({
          floorList: result.data.message
        })
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