var app = getApp()
Page({
  data: {
    imgUrls: [
      {
        link: "/pages/logs/logs",
        url: "../../images/pic1.jpg"
      },
      {
        link: "/pages/logs/logs",
        url: "../../images/pic2.jpg"
      },
      {
        link: "/pages/logs/logs",
        url: "../../images/pic3.jpg"
      },
      {
        link: "/pages/logs/logs",
        url: "../../images/pic4.jpg"
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    allSKU: [
      {"id": 1, "name": "涤纶纱1", "branch": "32S", "craft": "赛络纺", "weight": "12000吨", "unit": "吨", "warehouse": "北京 东城区","priceDigital": 1000,"special_price_status": 1,"update_time":"2017/10/23","if_commend":1},
      {"id": 2, "name": "涤纶纱2", "branch": "32S", "craft": "赛络纺", "weight": "12000吨", "unit": "吨", "warehouse": "北京 南城区","priceDigital": 1000,"special_price_status": 1,"update_time":"2017/10/23","if_commend":1},
      {"id": 3, "name": "涤纶纱3", "branch": "32S", "craft": "赛络纺", "weight": "12000吨", "unit": "吨", "warehouse": "北京 西城区","priceDigital": 1000,"special_price_status": 0,"update_time":"2017/10/23"},
      {"id": 4, "name": "涤纶纱4", "branch": "32S", "craft": "赛络纺", "weight": "12000吨", "unit": "吨", "warehouse": "北京 北城区","priceDigital": 1000,"special_price_status": 1,"update_time":"2017/10/23"},
      {"id": 5, "name": "涤纶纱5", "branch": "32S", "craft": "赛络纺", "weight": "12000吨", "unit": "吨", "warehouse": "北京 中城区","priceDigital": 1000,"special_price_status": 1,"update_time":"2017/10/23","if_commend":1},
      {"id": 6, "name": "涤纶纱5", "branch": "32S", "craft": "赛络纺", "weight": "12000吨", "unit": "吨", "warehouse": "北京 东城区","priceDigital": 1000,"special_price_status": 0,"update_time":"2017/10/23"}
    ],
    recentSKU: [],
    tabStatus: 0,
    scrollTop: 0
  },
  // 监听页面开在加载的状态 页面加载完成之后就不会在执行
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
  },
  // 监听页面显示 当从当前页面调转到另一个页面 另一个页面销毁时会再次执行
  onShow: function() {
  },
  // 监听页面渲染完成 完成之后不会在执行
  onReady: function() {
  },
  // 监听页面隐藏 当前页面调到另一个页面时会执行
  onHide: function() {
  },
  // 当页面销毁时调用
  onUnload: function() {
  },
  tabToAll: function () {
    var that = this;
    that.setData({
      tabStatus:0,
    });
  },
  tabToNew: function () {
    console.log("3e")
    var that = this;
    that.setData({
      tabStatus:1
    });
  },
  scroll: function (e) {
    // console.log(e) ;
    var that = this,
    scrollTop=that.data.scrollTop;
    that.setData({
      scrollTop:e.detail.scrollTop
    })
    console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
    console.log('scrollTop:'+scrollTop)
 }

});