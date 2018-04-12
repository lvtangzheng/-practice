// 纱线用途
var app = getApp();
var filterJS = require("../../utils/filter.js");
var utilJS = require("../../utils/util.js");

// var commonJS = require("../../utils/common.js");
Page({
  data: {
    purposeData: [],
    selectedPurpose: '不限'
  },

  onLoad: function (e) {
    var that = this;
    var selectedPurpose = e.selected;
    filterJS.getPurposeData(that);
    that.setData({ selectedPurpose: selectedPurpose });
  },
  toSelectItem: function (e) {
    var that = this;
    var prevPage = utilJS.getPrevPage();    
    var selectedPurpose = e.target.dataset.purpose || '不限';
    that.setData({ selectedPurpose: selectedPurpose });
    prevPage.setData({ selectedPurpose: selectedPurpose });
    wx.navigateBack({});
  }
})