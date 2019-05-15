var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    keyword: '',
    searchStatus: false,
    goodsList: [],
    helpKeyword: [],
    historyKeyword: [],
    categoryFilter: false,
    currentSortType: 'default',
    currentSortOrder: '',
    filterCategory: [],
    defaultKeyword: {},
    hotKeyword: [],
    currentPage: 1,
    totalPage: 1,
    pageSize: 20,
    currentSortType: 'id',
    currentSortOrder: 'desc',
    categoryId: 0
  },
  onLoad: function () {
    this.getSearchKeyword();
  },
  getSearchKeyword: function() {
    let that = this;
    util.request(api.SearchIndex).then(res=> {
      if (res.errno === 0) {
        that.setData({
          historyKeyword: res.data.historyKeywordList,
          defaultKeyword: res.data.defaultKeyword,
          hotKeyword: res.data.hotKeywordList
        });
      }
    });
  },
  closeSearch: function () {
    wx.navigateBack()
  },
  clearKeyword: function () {
    let that = this;
    that.setData({
      keyword: '',
      searchStatus: false
    });
  },

  inputChange: function (e) {
    let that = this;
    that.setData({
      keyword: e.detail.value,
      searchStatus: false
    });
    that.getHelpKeyword();
  },
  getHelpKeyword: function () {
    let that = this;
    util.request(api.SearchHelper, { keyword: that.data.keyword }).then(res=> {
      console.log(res);
      if (res.errno === 0) {
        that.setData({
          helpKeyword: res.data
        });
      }
    });
  },
  inputFocus: function () {
    let that = this;
    that.setData({
      // searchStatus: false,
      goodsList: []
    });
    if (that.data.keyword) {
      that.getHelpKeyword();
    }
  },
  onKeywordConfirm(e) {
    let that = this;
    that.getSearchResult(e.detail.value);
  },
  // 清除历史记录
  clearHistory: function () {
    let that = this;
    that.setData({
      historyKeyword: []
    })
    util.request(api.SearchClearHistory, {}, 'POST').then(res=> {
      if(res.errno == 0){
        console.log('清除成功');
      }
    });
  },
  getGoodsList: function () {
    // TODO 筛选排序出来的数据，有问题？
    let that = this;
    let page = that.data.currentPage;
    let size = that.data.pageSize;
    let sort = that.data.currentSortType;
    let order = that.data.currentSortOrder;
    let categoryId = that.data.categoryId;
    console.log(sort+ '|'+order+'|'+ categoryId)
    util.request(api.GoodsList, { 
      keyword: that.data.keyword, 
      page: page, 
      size: size, 
      sort: sort,
      order: order, 
      categoryId: categoryId
    }).then(res=> {
      console.log(res)
      if (res.errno === 0) {
        that.setData({
          searchStatus: true,
          categoryFilter: false,
          goodsList: that.data.goodsList.concat(res.data.goodsList),
          filterCategory: res.data.filterCategory,
          currentPage: page,
          totalPage: res.data.totalPages
        });
        wx.hideLoading();
      }
      //重新获取关键词
      that.getSearchKeyword();
    });
  },
  onKeywordTap: function (event) {
    this.getSearchResult(event.target.dataset.keyword);
  },
  getSearchResult(keyword) {
    let that = this;
    that.setData({
      keyword: keyword,
      currentPage: 1,
      categoryId: 0,
      goodsList: []
    });
    that.getGoodsList();
  },
  openSortFilter: function (e) {
    let that = this;
    let currentId = e.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        that.setData({
          categoryFilter: !that.data.categoryFilter,
          currentSortOrder: 'asc'
        });
        break;
      case 'priceSort':
        let tmpSortOrder = 'asc';
        if (that.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }
        that.setData({
          currentSortType: 'price',
          currentSortOrder: tmpSortOrder,
          categoryFilter: false,
          goodsList: []
        });
        that.getGoodsList();
        break;
      default:
        //综合排序
        that.setData({
          currentSortType: 'default',
          currentSortOrder: 'desc',
          categoryFilter: false,
          goodsList: []
        });
        that.getGoodsList();
    }
  },
  selectCategory: function (e) {
    let that = this;
    let currentIndex = e.target.dataset.categoryIndex;
    let filterCategory = that.data.filterCategory;
    let currentCategory = null;
    for (let key in filterCategory) {
      if (key == currentIndex) {
        filterCategory[key].selected = true;
        currentCategory = filterCategory[key];
      } else {
        filterCategory[key].selected = false;
      }
    }
    that.setData({
      filterCategory: filterCategory,
      categoryFilter: false,
      categoryId: currentCategory.id,
      currentPage: 1,
      goodsList: []
    });
    that.getGoodsList();
  },
  onReachBottom: function(){
    let that = this;
    let currentPage = that.data.currentPage;
    let totalPage = that.data.totalPage;
    if(currentPage>=totalPage){
      return false
    }else{
      that.setData({
        currentPage: currentPage+1
      })
    }
    wx.showLoading({
      title: '加载中...'
    });
    that.getGoodsList();
  }
})