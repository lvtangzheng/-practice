// SKU搜索结果页
var app = getApp();
var utilJS = require("../../utils/util.js");
Page({
  data: {
    searchParams: {
      q: null,
      page: 0,
      branch: '不限规格',
      craft: null,
      craftType: 0,
      kepiao: null,
      keran: null,
      purpose: null,
      warehouse: null,
      area_id: 0,
      industry_id: 1,
      version: 49,
    },
    keywords: null,
    showSearchBarCancle: true,
    hideBranch: true,
    customeBranch: null,
    allSKU: [
      {
        mount: "3吨",
        branch: "32S",
        company_id: 7893,
        countryId: 5,
        craft: "紧密赛络纺",
        id: 12941,
        industry_tag: 1,
        is_actuals: 0,
        is_paohuo: 0,
        is_ptd: 0,
        modified_time: "2018/04/10",
        name: "普梳",
        price: "6666元/吨",
        priceDigital: 6666,
        purpose: "剑杆用纱",
        special_price_status: 0,
        subTipArr: ["强力23232", "剑杆用纱", "纯棉"],
        unit: "吨",
        warehouse: "杭州市 西湖区"
      },{
        mount: "3吨",
        branch: "32S",
        company_id: 7893,
        countryId: 5,
        craft: "紧密赛络纺",
        id: 12942,
        industry_tag: 1,
        is_actuals: 0,
        is_paohuo: 0,
        is_ptd: 0,
        modified_time: "2018/04/10",
        name: "普梳",
        price: "6666元/吨",
        priceDigital: 6666,
        purpose: "剑杆用纱",
        special_price_status: 0,
        subTipArr: ["强力23232", "剑杆用纱", "纯棉"],
        unit: "吨",
        warehouse: "杭州市 西湖区"
      },{
        mount: "3吨",
        branch: "32S",
        company_id: 7893,
        countryId: 5,
        craft: "紧密赛络纺",
        id: 12943,
        industry_tag: 1,
        is_actuals: 0,
        is_paohuo: 0,
        is_ptd: 0,
        modified_time: "2018/04/10",
        name: "普梳",
        price: "6666元/吨",
        priceDigital: 6666,
        purpose: "剑杆用纱",
        special_price_status: 0,
        subTipArr: ["强力23232", "剑杆用纱", "纯棉"],
        unit: "吨",
        warehouse: "杭州市 西湖区"
      }
    ],
    LoadingMoreComplete: false
  },
  onLoad: function (options) {
    // 进入搜索页面，默认删除之前的缓存
    wx.removeStorageSync('searchParams');
  },

  onReady: function () {
  },

  onShow: function () {
    var that = this;
    var searchParams = wx.getStorageSync('searchParams') || {};
    searchParams.page = 0;
    that.setData({
      // allSKU: [],
      searchParams: searchParams,
      isPullDownRefresh: true
    });
    // TODO fetchSku
  },

  onHide: function () {
    // this.setData({ allSKU: [] })
  },

  onUnload: function () {
    console.log("search index page Unload");
    wx.removeStorageSync('searchParams');
  },

  onPullDownRefresh: function () {
    var that = this;
    wx.stopPullDownRefresh()
  },
  bindFocus: function () {
    this.setData({
      showSearchBarCancle: false
    });
  },

  // 搜索框输入
  inputKeywords: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var searchParams = utilJS.setDefaultSearchParams();
    if (keywords.length == 0) {
      keywords = null;
    }
    that.setData({
      keywords: keywords,
      searchParams: searchParams,
      allSKU: that.data.allSKU
    });
  },
  /**
   * SKU关键字搜索
   */
  doSearch: function (e) {
    var that = this;
    var keywords = that.data.keywords;
    var searchParams = utilJS.setDefaultSearchParams();
    if (keywords) {
      searchParams.q = keywords;
      that.setData({ 
        searchParams: searchParams, 
        allSKU: []
      });
    }
    
  },
  // 选择品类
  industryTapShow: function () {
    var that = this;
    that.setData({
      hideBranch: true
    });
    wx.setStorageSync('searchParams', that.data.searchParams);
    wx.navigateTo({
      url: "/pages/search/industry"
    });
  },
  // 选择工艺
  craftTapShow: function () {
    var that = this;
    var searchParams = that.data.searchParams;
    var craft = searchParams.craft;
    var craftType = searchParams.craftType;
    that.setData({
      hideBranch: true
    });
    wx.navigateTo({
      url: "/pages/search/craft?craft=" + craft + "&craftType=" + craftType
    });
  },
  // 选择规格
  branchTapShow: function () {
    var that = this;
    var hideBranch = that.data.hideBranch;
    var searchParams = that.data.searchParams;
    var branchValue = parseInt(searchParams.branch);
    if (!isNaN(branchValue) && branchValue > 0) {
      searchParams.branchValue = branchValue;
      searchParams.branchType = branchValue + 'S' == searchParams.branch ? 0 : 1;
      that.setData({ hideBranch: !hideBranch, searchParams: searchParams });
    } else {
      that.setData({ hideBranch: !hideBranch });
    }
  },
  /**
   * 恢复默认的纱线规格
   */
  setDefaultBranch: function () {
    var searchParams = this.data.searchParams;
    searchParams.branch = '不限规格';
    searchParams.branchType = 0;
    searchParams.branchValue = null;
    this.setData({ searchParams: searchParams });
  },
  /**
   * 自定义输入规格
   */
  setCustomBranch: function (e) {
    var that = this;
    var branchValue = parseInt(e.detail.value);
    var branchType = parseInt(e.currentTarget.dataset.branchtype);
    var searchParams = that.data.searchParams;
    searchParams.branchValue = branchValue;
    searchParams.branchType = branchType;
    that.setData({ searchParams: searchParams });
  },
  // 自定义规格 确定
  customBranchTap: function (e) {
    var that = this;
    var searchParams = that.data.searchParams;
    var branchType = searchParams.branchType;
    var branchValue = branchType == 1 ? e.detail.value.fiberBranch : e.detail.value.commonBranch;

    //如果未填写支数或规格
    if (branchValue) {
      var branchUnit = branchType == 1 ? 'D' : 'S';
      var branch = String(branchValue) + branchUnit;
    } else {
      branchValue = null;
      var branchType = 1;
      var branchUnit = '';
      var branch = '不限规格'
    }

    var searchParams = that.data.searchParams;
    searchParams.branch = branch;
    searchParams.branchType = branchType;
    searchParams.branchUnit = branchUnit;
    searchParams.branchValue = branchValue;
    searchParams.page = 0;
    that.setData({
      searchParams: searchParams,
      // allSKU: []
    });

    wx.setStorageSync('searchParams', searchParams);
    that.closeModal();
  },
  /**
   * 关闭规格弹出modal 层
   */
  closeModal: function () {
    this.setData({
      hideBranch: true
    })
  },
  // 滑动屏幕关闭弹窗
  handletouch: function () {
    var that = this;
    that.setData({
      hideBranch: true
    });
  },
  // 筛选
  moreTapShow: function () {
    var that = this;
    var searchParams = that.data.searchParams;
    wx.setStorageSync('searchParams', searchParams);
    that.setData({ hideBranch: true });
    wx.navigateTo({
      url: "/pages/search/condition"
    })
  },
  changeParameter: function (newKey, newValue) {
    if (newValue.indexOf('不限') > -1) {
      newValue = null;
    }
    var currentParam = this.data.parameter;
    if (newValue == null) { //删除参数
      delete currentParam[newKey];
    } else {              //替换参数
      currentParam[newKey] = newValue;
    }
    this.data.parameter = currentParam;
  },
  // 拨打客户电话
  makeServiceTel: function () {
    var serviceTel = '400-400-4000';
    wx.makePhoneCall({
      phoneNumber: serviceTel
    });
  },
  //跳转到详情页
  bindGoodsDetailTap: function (e) {
    var that = this;
    utilJS.showModal("","不需要跳转","","#ff7600")
  },
})