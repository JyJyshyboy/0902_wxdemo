import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isShow:false,
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  TimeId:-1,          //定义一个全局定时器
  handleIpt(e){            //输入框内容
    const {value} = e.detail
    if(!value.trim()){     //不能为空
      this.setData({
        isShow:false,
        goods:[]
      })
      return
    }
    clearTimeout(this.TimeId);        //用setTimeout实现防抖
    this.TimeId = setTimeout(() =>{     
      this.qsearch(value);
    },1500)
    this.setData({
      isShow:true,
      value
    })
  },

  handleClearValue(){
    this.setData({
      isShow:false,
      goods:[],
      value:""
    })
  },

  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}});
    this.setData({
      goods: res.data.message
    })
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