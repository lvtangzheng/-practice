// index.js
var app = getApp();
var requestLoginUrl = "Login/login";
var utils = require("../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mobileValue: '',
    passValue: '',
    loginData: {},
    loginBtnStatus: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
  },
  doLogin: function (e) {
    var that = this;
    var mobile = e.detail.value.phone.trim();
    var pass = e.detail.value.pass.trim();

    //todo::regex
    if (!utils.checkMobile(mobile)) {
      wx.showModal({
        title: '提示',
        content: '手机号有误',
        showCancel: false,
      })
      return false;
    }

    if (pass.length < 6) {
      wx.showModal({
        title: '提示',
        content: '密码有误',
        showCancel: false,
      })
      return false;
    }

    //判断是否获取
    if(that.data.loginBtnStatus){
      wx.showToast({
        title: '登录成功！',
        icon: 'loading',
        success: function () {
          wx.navigateBack({
            delta: 1,
            fail: function () {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        }
      })
    }else{
    }
  },
  bindKeyInput: function (e) {
    var that = this;
    var fromType = e.currentTarget.dataset.from;
    var formValue = e.detail.value.trim().toString();
    var loginData = that.data.loginData;
    var Objs = {};

    if (fromType == 'phone') {
      Objs.mobileValue = e.detail.value;
      if (formValue.length == 11) {
        loginData.mobile = formValue;
      } else {
        loginData.mobile = null;
      }
    } else if (fromType == 'pass') {
      Objs.passValue = e.detail.value;
      if (formValue.length >= 6) {
        loginData.password = formValue;
      } else {
        loginData.password = null
      }
    }

    var loginBtnStatus = that.data.loginBtnStatus;
    if (loginData.mobile != null && loginData.password != null) {
      loginBtnStatus = true;
    }else{
      loginBtnStatus = false;
    }

    Objs.loginData = loginData;
    Objs.loginBtnStatus = loginBtnStatus
    that.setData(Objs);
  }
})