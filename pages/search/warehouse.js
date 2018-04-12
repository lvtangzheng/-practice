var app = getApp();
var filterJS = require("../../utils/filter.js");
var utilJS = require("../../utils/util.js");
Page({
  data: {
    hotCity: [],
    allCity: [],
    selectedWarehouse: '不限',
    selectedAreaID: 0,
  },

  onLoad: function (e) {
    var that = this;
    var selectedAreaID = parseInt(e.selected) || 0;
    var selectedWarehouse = e.warehouse || '不限';
    that.setData({
      selectedAreaID: selectedAreaID,
      selectedWarehouse: selectedWarehouse
    });
  },
  onShow: function () {
    var that = this;
    var hotCity = filterJS.getHotCity();
    var allCity = filterJS.getHotCityCategory(that);
    that.setData({ 
      hotCity: hotCity,
      allCity: allCity 
    });
  },
  /**
   * 选择城市
   */
  selectCity: function (e) {
    var that = this;
    var prevPage = utilJS.getPrevPage();
    var selectedAreaID = parseInt(e.target.dataset.id);
    var selectedWarehouse = e.target.dataset.cityname;
    var Obj = {
      selectedAreaID: selectedAreaID,
      selectedWarehouse: selectedWarehouse
    };
    that.setData(Obj);
    prevPage.setData(Obj);
    wx.navigateBack({});
  },
})