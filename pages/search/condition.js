//搜索条件筛选
var app = getApp();
var filterJS = require("../../utils/filter.js");
Page({
  data: {
    kepiaoData: [],
    keranData: [],
    searchParams: {},
    selectedKepiao: null,
    selectedKeran: null,
    selectedAreaID: 0,
    selectedWarehouse: '不限',
    selectedPurpose: '不限',
    qiangliCeilPointer: null,
    qiangliFloorPointer: null,
  },

  onLoad: function (options) {
    var that = this;
    var keranData = filterJS.getKeranOptions();
    var kepiaoData = filterJS.getKepiaoOptions();
    var searchParams = wx.getStorageSync('searchParams') || {};
    var selectedPurpose = searchParams.purpose || '不限';
    var selectedKepiao = searchParams.kepiao || null;
    var selectedKeran = searchParams.keran || null;
    var selectedAreaID = searchParams.area_id || 0;
    var selectedWarehouse = searchParams.warehouse || '不限';
    that.setData({
      keranData: keranData,
      kepiaoData: kepiaoData,
      selectedPurpose: selectedPurpose,
      selectedKepiao: selectedKepiao,
      selectedKeran: selectedKeran,
      selectedAreaID: selectedAreaID,
      selectedWarehouse: selectedWarehouse,
      searchParams: searchParams,
    });
  },

  onShow: function () {

  },
  /**
   * 修改可漂性
   */
  changeKepiaoOptions: function (e) {
    var that = this;
    var targetOption = e.currentTarget.dataset.value;
    that.setData({ selectedKepiao: targetOption });
  },
  /**
   * 修改可染性
   */
  changeKeranOptions: function (e) {
    var that = this;
    var targetOption = e.currentTarget.dataset.value;
    that.setData({ selectedKeran: targetOption });
  },
  /**
   * 选择用途
   */
  changePurposeOptions: function () {
    var that = this;
    var selectedPurpose = that.data.selectedPurpose;
    wx.navigateTo({
      url: "/pages/search/purpose?selected=" + selectedPurpose
    });
  },
  /**
   * 选择存货地
   */
  changeWarehouseOptions: function () {
    var that = this;
    var selectedAreaID = that.data.selectedAreaID;
    var selectedWarehouse = that.data.selectedWarehouse;
    wx.navigateTo({
      url: "/pages/search/warehouse?selected=" + selectedAreaID + "&warehouse=" + selectedWarehouse
    });
  },
  //搜索SKU
  doSearch: function (e) {
    var that = this;
    var searchParams = that.data.searchParams;
    searchParams.keran = that.data.selectedKeran;
    searchParams.kepiao = that.data.selectedKepiao;
    searchParams.area_id = that.data.selectedAreaID;
    searchParams.warehouse = that.data.selectedWarehouse;
    searchParams.purpose = that.data.selectedPurpose;
    that.setData({ searchParams: searchParams });
    wx.setStorageSync('searchParams', searchParams);
    wx.navigateBack({});
  },
  // 重置搜索条件
  resetConditions: function (e) {
    var that = this;
    that.setData({
      selectedPurpose: '不限',
      selectedWarehouse: '不限',
      selectedAreaID: 0,
      selectedKepiao: null,
      selectedKeran: null,
    });
  }
})