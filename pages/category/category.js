import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cates:[],      //接口返回的数据
    leftList:[],   //左边滚动栏
    rightList:[],  //右边滚动栏
    currentIndex:0,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const cates = wx.getStorageSync('cates')   //缓存接收到的分类数据
      if(!cates) {
        this.getCategoryData()
      }else{
        if(Date.now()-cates.time>1000*20){   //判断数据是否过期
          this.getCategoryData()
        }else{
          this.cates = cates.data;
          let leftList = this.cates.map(v =>v.cat_name);
          let rightList = this.cates[0].children;           //将接口返回的数据结构  改造成左右滚动栏的数据结构
          this.setData({
            leftList,
            rightList
          })
        }
      }
  },

  getCategoryData(){
    request({
      url:"/categories"
    })
    .then(result =>{
      this.cates = result.data.message;

      wx.setStorageSync('cates', {time:Date.now(),data:this.cates}); //将接受到的数据按照{time: ,data: }缓存起来

      let leftList = this.cates.map(v =>v.cat_name);
      let rightList = this.cates[0].children;           //将接口返回的数据结构  改造成左右滚动栏的数据结构
      this.setData({
        leftList,
        rightList
      })
    })
  },

  handleLeftItem(e){
    //console.log(e)
    const {index} = e.currentTarget.dataset;
    let rightList = this.cates[index].children;     
    this.setData({
      currentIndex: index,
      rightList,
      scrollTop:0       //点击左边选项后右边滚动置顶
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