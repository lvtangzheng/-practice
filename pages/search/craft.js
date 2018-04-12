// 纱线工艺
var app = getApp();
var filterJS = require("../../utils/filter.js");
Page({
  data: {
    craftData: [],
    searchParams: {},
    selectedCraft: null,
    selectedCraftType: 0,
  },

  onLoad: function (e) {
    var that = this;
    console.log(e);
    var selectedCraft = e.craft || '不限工艺';
    var craftType = parseInt(e.craftType) || 0;
    filterJS.getCraftData(that, craftType);
    that.setData({ selectedCraft: selectedCraft });
  },
  onShow: function () {
    var that = this;
    var searchParams = wx.getStorageSync('searchParams');
    that.setData({ searchParams: searchParams });
  },

  toSelectItem: function (e) {
    var that = this;
    var searchParams = wx.getStorageSync('searchParams') || {};
    var selectedCraft = e.currentTarget.dataset.craft;
    searchParams.craft = selectedCraft;

    console.log(selectedCraft);
    that.setData({
      selectedCraft: selectedCraft,
    });
    wx.setStorageSync('searchParams', searchParams);
    wx.navigateBack({});
  },
})