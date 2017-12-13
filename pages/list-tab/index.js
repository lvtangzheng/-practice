// 小程序首页
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    visitHistory: [
    {
      classify:"2017.11.20",
      children:[
        { 
          avatar:"",
          companyName:"熊孩子1",
          id:1,
          mobile:"",
          time:"10:21:22"
        }
      ]
    },
    {
      classify:"2017.11.02",
      children:[
        { 
          avatar:"/images/pic2.jpg",
          companyName:"熊孩子2",
          id:2,
          mobile:"15394235277",
          time:"10:21:22"
        },
        { 
          avatar:"",
          companyName:"熊孩子3",
          id:3,
          mobile:"",
          time:"10:21:22"
        }
      ]
    },
    {
      classify:"2017.02.11",
      children:[
        { 
          avatar:"/images/pic1.jpg",
          companyName:"熊孩子4",
          id:4,
          mobile:"",
          time:"10:21:22"
        },
        { 
          avatar:"/images/pic3.jpg",
          companyName:"熊孩子1",
          id:44,
          mobile:"153942377",
          time:"10:21:22"
        },
        
        { 
          avatar:"/images/pic4.jpg",
          companyName:"熊孩子4",
          id:4,
          mobile:"",
          time:"10:21:22"
        }
      ]
    }

    ],
    colectedHistory: [
    { 
      companyName: "科技有限公司1",
      avatar:"/images/pic3.jpg",
      owner:"熊孩子1",
      id:3,
      up_num: 12,
      is_certified: 2,
      mobile:"3394235277",
      time:"10:21:22"
    },
    { 
      companyName: "科技有限公司12",
      avatar:"/images/pic2.jpg",
      owner:"熊孩子2",
      id:3,
      up_num: 23,
      is_certified: 1,
      mobile:"3394235277",
      time:"10:21:22"
    },
    { 
      companyName: "变态公司名变态公司名变态公司名变态公司名变态公司名变态公司名变态公司名变态公司名变态公司名不给你认证",
      avatar:"/images/pic1.jpg",
      owner:"为什么老是熊孩子",
      id:3,
      up_num: 33,
      is_certified: 0,
      mobile:"3394235277",
      time:"10:21:22"
    }],
    showVisited: true,
    showColected: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
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
    var that = this;
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
  onPullDownRefresh: function (e) {
    var that = this;
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
  },
  /**
   * 跳转到商城首页
   */
  redirect2Store: function (e) {
    var companyIDparam = parseInt(e.currentTarget.dataset.companyid);
    if (!companyIDparam || isNaN(companyIDparam)) {
      wx.showModal({
        title: '店铺ID为空',
        showCancel: false,
      })
      return false;
    }
    wx.setStorageSync('companyId', companyIDparam);
    wx.switchTab({
      url: '/pages/store/index'
    })
  },
  toMyVisited: function(){
    var that = this;
    that.setData({
      showVisited: true,
      showColected: false
    })
  },
  toMyCollected: function(){
    var that = this;
    that.setData({
      showVisited: false,
      showColected: true
    })
  },
  makePhoneCall: function(){
    var mobile = e.currentTarget.dataset.mobile;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  }
})