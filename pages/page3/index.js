//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},

    actionSheetHidden: true,
    actionSheetItems: ['item1', 'item2', 'item3'],

    hiddenModal: true,
    imgalist: [

      // "/images/pic1.jpg",
      // "/images/pic2.jpg",
      // "/images/pic3.jpg",
      // "/images/pic4.jpg",
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496287851&di=0a26048f586b852193cb5026d60c4fad&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F74%2F05%2F99C58PICYck.jpg',  
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495693185413&di=0d0acdebf0f532edd0fcdb76265623c5&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2Fimg013%2Fv3%2F2%2Fd%2F61.jpg',  
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495693185413&di=55835ae37fdc95a317b03f28162c0de1&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201307%2F12%2F20130712224237_nSjht.jpeg', 
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495693185410&di=e28cc03d2ae84130eabc26bf0fc7495f&imgtype=0&src=http%3A%2F%2Fpic36.photophoto.cn%2F20150814%2F0005018308986502_b.jpg'
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  listenerButtonAction: function() {
      this.setData({
        //取反
          actionSheetHidden: !this.data.actionSheetHidden
      });
  },
  listenerActionSheet:function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  //预览图片
  previewImage: function (e) {
    var that = this;
    wx.previewImage({
      current: e.target.dataset.src,
      urls: that.data.imgalist 
    })
  },
})