let ajaxTimes = 0
export const request = (params) =>{ //封装Promise函数
  ajaxTimes++; //发送一次++一次
  wx.showLoading({  //发送请求时提示‘加载中’，mask作用为出现loading时不能作其他动作
    title: '加载中',
    mask:true
  });
  const baseUrl= "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject) =>{
    wx.request({
      ...params,
      url:baseUrl + params.url,
      success: (result) => {
        resolve(result);
      },
      fail:(err) =>{
        reject(err);
      },
      complete:() =>{
        ajaxTimes--;     //发送一次--一次
        if(ajaxTimes===0){
          wx.hideLoading();
        }
      }
    })
  })
}