var commonCityData = require('../../utils/city.js');
var tradesJS = require('../../utils/trades.js');

var app = getApp()
Page({
  data: {
    industryCategoryData: {},
    swiperIndustryCurrent: 0,
    imgUrls: [
      {
        link: "/pages/logs/logs",
        url: "/images/pic1.jpg"
      },
      {
        link: "/pages/logs/logs",
        url: "/images/pic2.jpg"
      },
      {
        link: "/pages/logs/logs",
        url: "/images/pic3.jpg"
      },
      {
        link: "/pages/logs/logs",
        url: "/images/pic4.jpg"
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    interval2: 10000,
    duration: 1000,
    circular: true,

    array: ['Android', 'IOS', 'ReactNativ', 'WeChat', 'Web'],
    index: 0,
    time: '18:00',
    date: '2017-07-27',
    
    provinces:[],
    citys:[],
    districts:[],
    selProvince:'请选择',
    selCity:'请选择',
    selDistrict:'请选择',
    selProvinceIndex:0,
    selCityIndex:0,
    selDistrictIndex:0
  },
  // 监听页面开在加载的状态 页面加载完成之后就不会在执行
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    this.initCityData(1);
    tradesJS.initIndustryData(that);
  },
  // 监听页面显示 当从当前页面调转到另一个页面 另一个页面销毁时会再次执行
  onShow: function() {
    console.log('index---------onShow()')
  },
  // 监听页面渲染完成 完成之后不会在执行
  onReady: function() {
    console.log('index---------onReaday()');
  },
  // 监听页面隐藏 当前页面调到另一个页面时会执行
  onHide: function() {
    console.log('index---------onHide()')
  },
  // 当页面销毁时调用
  onUnload: function() {
    console.log('index---------onUnload')
  },
  
  // 监听普通picker选择器
  listenerPickerSelected: function(e) {
      //改变index值，通过setData()方法重绘界面
      this.setData({
        index: e.detail.value
      });
  }, 
  // 监听时间picker选择器
  listenerTimePickerSelected: function(e) {
      //调用setData()重新绘制
      this.setData({
          time: e.detail.value,
      });
  },
  // 监听日期picker选择器
  listenerDatePickerSelected:function(e) {
    this.setDate({
      date: e.detail.value
    })
  },

  initCityData:function(level, obj){
    if(level == 1){
      var pinkArray = [];
      for(var i = 0;i<commonCityData.cityData.length;i++){
        pinkArray.push(commonCityData.cityData[i].name);
      }
      this.setData({
        provinces:pinkArray
      });
    } else if (level == 2){
      var pinkArray = [];
      var dataArray = obj.cityList
      for(var i = 0;i<dataArray.length;i++){
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        citys:pinkArray
      });
    } else if (level == 3){
      var pinkArray = [];
      var dataArray = obj.districtList
      for(var i = 0;i<dataArray.length;i++){
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        districts:pinkArray
      });
    } 
  },
  swiperIndustryChange: function (e) {
    this.setData({
      swiperIndustryCurrent: e.detail.current
    })
  },
  bindPickerProvinceChange:function(event){
    var selIterm = commonCityData.cityData[event.detail.value];
    this.setData({
      selProvince:selIterm.name,
      selProvinceIndex:event.detail.value,
      selCity:'请选择',
      selCityIndex:0,
      selDistrict:'请选择',
      selDistrictIndex: 0
    })
    this.initCityData(2, selIterm)
  },
  bindPickerCityChange:function (event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[event.detail.value];
    this.setData({
      selCity:selIterm.name,
      selCityIndex:event.detail.value,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(3, selIterm)
  },
  bindPickerChange:function (event) {
    var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[event.detail.value];
    if (selIterm && selIterm.name && event.detail.value) {
      this.setData({
        selDistrict: selIterm.name,
        selDistrictIndex: event.detail.value
      })
    }
  },
  toLogin: function(){
    wx.navigateTo({
      url: "/pages/login/index"
    })
  },
  toTemplete1: function(){
    wx.navigateTo({
      url: "/pages/templete1/templete1"
    })
  },
  toScrollView: function(){
    wx.navigateTo({
      url: "/pages/scrollView/index"
    })
  },
  toCanvas: function(){
    wx.navigateTo({
      url: "/pages/canvas/index"
    })
  },
  toTabList: function(){
    wx.navigateTo({
      url: "/pages/list-tab/index"
    })
  },
  toTabGif: function(){
    wx.navigateTo({
      url: "/pages/animate/index"
    })
  },
  toScrolldelete: function(){
    wx.navigateTo({
      url: "/pages/scrollDelete/index"
    })
  },
  toTimeCustome:function(){
    wx.navigateTo({
      url: "/pages/picker/index"
    })
  },
  toSearch: function(){
    wx.navigateTo({
      url: "/pages/search/index"
    })
  },
  toCustomOpt: function(){
    wx.navigateTo({
      url: "/pages/operatelist/index"
    })
  }
});