import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QureyParams.cid = options.cid;
    this.getGoodsList()
  },
  QureyParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  totalpages:1,  //定义数据总页数

  getGoodsList(){
    request({
      url:"/goods/search",
      data:this.QureyParams
    }).then(result =>{
      const total = result.data.message.total   //获取数据总数
      this.totalpages = Math.ceil(total/this.QureyParams.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList,...result.data.message.goods]  //将后一页数据与上一页数据拼接为新数组
      })
      wx.stopPullDownRefresh()   
    })
  },

  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
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
    this.setData({
      goodsList:[]     //重置数组
    })
    this.QureyParams.pagenum = 1;   //重置页数
    this.getGoodsList()    //下拉刷新发送请求
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QureyParams.pagenum>=this.totalpages){ //判断当前页码是否超过最大页码
      wx.showToast({
        title: '没有下一页了',
      })
    }else{
      this.QureyParams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})