var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../services/user.js');
var app = getApp();

Page({
  data: {
    userInfo: {},
    navItem: [
      {id: 0,"img_url":"/images/mynav/icon_order.png","txt":"我的订单","to_url":"/pages/ucenter/order/order"},
      {id: 1,"img_url":"/images/mynav/icon_discount.png","txt":"优惠券","to_url":"/pages/ucenter/coupon/coupon"},
      {id: 2,"img_url":"/images/mynav/icon_gift.png","txt":"礼品卡","to_url":""},
      {id: 3,"img_url":"/images/mynav/icon_collect.png","txt":"我的收藏","to_url":"/pages/my/collect"},
      {id: 4,"img_url":"/images/mynav/icon_location.png","txt":"我的足迹","to_url":"/pages/ucenter/footprint/footprint"},
      {id: 5,"img_url":"/images/mynav/icon_gift.png","txt":"会员福利","to_url":""},
      {id: 6,"img_url":"/images/mynav/icon_location.png","txt":"地址管理","to_url":"../address/address"},
      {id: 7,"img_url":"/images/mynav/icon_safe.png","txt":"账号安全","to_url":""},
      {id: 8,"img_url":"/images/mynav/icon_contact.png","txt":"联系客服","to_url":""},
      {id: 9,"img_url":"/images/mynav/icon_help.png","txt":"帮助中心","to_url":"/pages/ucenter/feedback/feedback"},
      {id: 10,"img_url":"/images/mynav/icon_feedback.png","txt":"意见反馈","to_url":""},
    ]
  },
  onLoad: function (options) {
    // console.log(app.globalData)
  },
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');
    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  getUserInfo: function (e) {
    console.log(e);
    var that = this;
    var res2 = e.detail || {};
    if (!res2.hasOwnProperty('errMsg') || res2.errMsg != 'getUserInfo:ok') {
      return;
    }
    var iv = res2.iv;
    var rawData = res2.rawData;
    var signature = res2.signature;
    var encryptedData = res2.encryptedData;
    wx.setStorageSync('userRawInfo', res2.userInfo);
    wx.setStorageSync('userInfoData', e.detail);
    that.setData({ userRawInfo: res2.userInfo });
    that.goLogin();
  },
  goLogin(){
    user.loginByWeixin().then(res => {
      console.log(res)
      this.setData({
        userInfo: res.data.userInfo
      });
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.token = res.data.token;
    }).catch((err) => {
      console.log(err)
    });
  },
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
})