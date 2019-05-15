var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();

Page({
  data: {
    navList: [],
    goodsList: [],
    currentCategory: {},
    id: 0,
    currentPage: 1,
    size: 20,
    totalPage: 1
  },
  onLoad: function (options) {
    let that = this;
    if(options.id){
      that.setData({
        id: parseInt(options.id)
      })
    };
    console.log(options.id)
    that.getCategoryList();
  },
  getCategoryList: function(){
    let that = this;
    util.request(api.GoodsCategory,{id: that.data.id}).then(res=>{
      console.log(res)
      if(res.errno == 0){
        that.setData({
          navList: res.data.brotherCategory,
          currentCategory: res.data.currentCategory
        })
        that.getGoodsList();
      }else{

      }
    })
  },
  getGoodsList: function(){
    let that = this;
    console.log(that.data.currentPage)
    let categoryId = that.data.id;
    let page = that.data.currentPage;
    let size = that.data.size;
    util.request(api.GoodsList,{
      categoryId: categoryId,
      page: page,
      size: size
    }).then(res=>{
      console.log(res);
      if(res.errno == 0){
        that.setData({
          goodsList: that.data.goodsList.concat(res.data.goodsList),
          totalPage: res.data.totalPages,
          currentPage: page
        })
        wx.hideLoading();
      }
    })
  },
  switchCate: function(e){
    let that = this;
    let currentTarget = e.currentTarget.dataset.id;
    if(that.data.id == currentTarget){
      return false
    }
    that.setData({
      id: currentTarget,
      currentPage: 1,
      goodsList: []
    })
    that.getCategoryList();
  },
  onShow: function () {
  
  },
  onReachBottom: function () {
    let that = this;
    let currentPage = that.data.currentPage;
    console.log(currentPage)
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
  },
})