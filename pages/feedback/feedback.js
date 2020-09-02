// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"体验反馈",
        isActive:true
      },
      {
        id:1,
        value:"商家投诉",
        isActive:false
      },
    ],
    chooseImg:[],
    value:''          //输入框中的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  
  handleChooseImg(){     // 点击按钮添加图片
    wx.chooseImage({
      count: 5,       //最多添加5张
      success:(result) =>{
        const chooseImg = [...this.data.chooseImg,...result.tempFilePaths]
        this.setData({
          chooseImg
        })
      }
    })
  },

  handleImgClear(e){      // 点击图片移除图片
    const {index} = e.currentTarget.dataset
    const chooseImg = this.data.chooseImg
    chooseImg.splice(index,1)
    this.setData({
      chooseImg
    })
  },

  handleGetValue(e){      //获取输入框中的值
    const {value} = e.detail
    this.setData({
      value
    })
  },


  
  handleSubmit(){        //点击按钮提交
    const {value} = this.data
    if(!value.trim()){     //验证输入合法性
      wx.showToast({
        title: '内容不能为空',
        icon:'none',
        mask:true
      })
      return
    }
    wx.uploadFile({
      filePath: 'filePath',
      name: 'name',
      url: 'url',
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