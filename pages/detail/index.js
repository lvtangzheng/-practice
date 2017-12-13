//获取应用实例
var app = getApp()
Page({
  data: {
    
  },

  onLoad:function(options) {
    this.setData({
      id: this.options.id,
      title: this.options.title,
      image: this.options.img
    });

    wx.setNavigationBarTitle({
      title: "详情",
    })
  }
})