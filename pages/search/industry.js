var app = getApp();
var filterJS = require("../../utils/filter.js");
Page({
  data: {
    industryTag: 1,
    industryCategory: [],
    selectedIndustryLevel2: 11,
    selectedIndustryLevel3: 0,
    selectedIndustryLevel2Name: '',
    selectedIndustryLevel3Name: '',
    selectedIndustryLevel2Index: 0,
    selectedIndustryLevel3Index: 0,
  },
  onLoad: function () {
    var that = this;
    filterJS.getIndustryCategory(that);
  },
  onShow: function () {
    var that = this;
    var searchParams = wx.getStorageSync('searchParams') || {};
    filterJS.activeIndustryCategory(that);
    that.setData({ searchParams: searchParams });
  },
  /**
   * 修改纱线二级分类
   */
  changedIndustryLevel2: function (e) {
    var that = this;
    var industryTag = that.data.industryTag;
    var industryLevel2Name = e.target.dataset.industryname;
    var industryLevel2 = parseInt(e.currentTarget.dataset.id);
    var industryLevel2Index = parseInt(e.target.dataset.index);

    // 判断 industryTag
    if (industryLevel2 == 12) {
      industryTag = 2;
    } else if (industryLevel2 == 15) {
      industryTag = 3;
    } else {
      industryTag = 1;
    }
    that.setData({
      industryTag: 1,
      selectedIndustryLevel2: industryLevel2,
      selectedIndustryLevel2Name: industryLevel2Name,
      selectedIndustryLevel2Index: industryLevel2Index
    });
  },
  /**
   * 选择纱线三级分类
   */
  changedIndustryLevel3: function (e) {
    var that = this;
    var industryTag = that.data.industryTag;
    var industryLevel3 = parseInt(e.target.dataset.id);
    var industryLevel3Name = String(e.target.dataset.industryname);

    // 获取搜索参数
    var searchParams = that.data.searchParams;
    searchParams.industry_id = industryLevel3;
    searchParams.industryTag = industryTag;
    searchParams.industryName = industryLevel3Name;
    that.setData({
      selectedIndustryLevel3: industryLevel3,
      selectedIndustryLevel3Name: industryLevel3Name,
    });
    wx.setStorageSync('searchParams', searchParams);
    wx.navigateBack({});
  }
})