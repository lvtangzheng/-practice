var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    comments: [],
    allCommentList: [],
    picCommentList: [],
    typeId: 0,
    valueId: 0,
    showType: 0,
    allCount: 0,
    hasPicCount: 0,
    allPage: 1,
    picPage: 1,
    size: 20
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      typeId: options.typeId,
      valueId: options.valueId
    });
    that.getCommentCount();
    that.getCommentList();
  },
  getCommentCount: function () {
    let that = this;
    util.request(api.CommentCount, { 
      valueId: that.data.valueId, 
      typeId: that.data.typeId
    }).then(res=> {
      console.log(res);
      if (res.errno === 0) {
        that.setData({
          allCount: res.data.allCount,
          hasPicCount: res.data.hasPicCount
        });
      }
    });
  },
  getCommentList: function(){
    let that = this;
    util.request(api.CommentList, { 
      valueId: that.data.valueId, 
      typeId: that.data.typeId, 
      size: that.data.size,
      page: (that.data.showType == 0 ? that.data.allPage : that.data.picPage),
      showType: that.data.showType 
    }).then(res=> {
      console.log(res)
      if (res.errno === 0) {
        if (that.data.showType == 0) {
          that.setData({
            allCommentList: that.data.allCommentList.concat(res.data.data),
            allPage: res.data.currentPage,
            comments: that.data.allCommentList.concat(res.data.data)
          });
        } else {
          that.setData({
            picCommentList: that.data.picCommentList.concat(res.data.data),
            picPage: res.data.currentPage,
            comments: that.data.picCommentList.concat(res.data.data)
          });
        }
      }
    });
  },
  switchTab: function () {
    let that = this;
    that.setData({
      showType: that.data.showType == 1 ? 0 :1
    });
    that.getCommentList();
  },
  onReachBottom: function(){
    let that = this;
    if (that.data.showType == 0) {
      if (that.data.allCount / that.data.size < that.data.allPage) {
        return false;
      }
      that.setData({
        'allPage' : that.data.allPage + 1
      });
    } else {
      if (that.data.hasPicCount / that.data.size < that.data.picPage) {
        return false;
      }
      that.setData({
        'picPage': that.data.picPage + 1
      });
    }
    that.getCommentList();
  }
})