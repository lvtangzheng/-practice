var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({
  data: {
    typeId: 0,
    collectList: [],
    currentInex: 0,
    currentItemIndex: 0,
    cardIndex: 0
  },
  onLoad: function (options) {
    this.getCollectList();
  },
  getCollectList() {
    let that = this;
    util.request(api.CollectList, { typeId: that.data.typeId}).then(res=> {
      console.log(res);
      if (res.errno === 0) {
        that.setData({
          collectList: res.data.data
        });
      }
    });
  },
  openGoods(event) {
    let that = this;
    let goodsId = that.data.collectList[event.currentTarget.dataset.index].value_id;
    wx.navigateTo({
      url: '/pages/detail/goodsdetail?id=' + goodsId,
    }); 
  }
})