var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  data: {
    id: 0,
    attribute: [],
    brand: {},
    comment: {},
    gallery: [],
    goodsInfo: {},
    issueList: [],
    productList: [],
    specificationList: [],
    userHasCollect: 0,
    relatedGoods: [],
    openAttr: false,
    collectBackImage: '/images/icon_collect.png',
    noCollectImage: "/images/icon_collect.png",
    hasCollectImage: "/images/icon_collect_checked.png",
    checkedSpecText: "请选择规格数量",
    number: 1,
    cartGoodsCount: 0
  },

  onLoad:function(options) {
    let that = this;
    that.setData({
      id: options.id
    });
    that.getGoodInfo();
    console.log(that.data.id)
  },
  getGoodInfo: function(){
    let that = this;
    util.request(api.GoodsDetail, {id: that.data.id}).then(res=>{
      console.log(res)
      if(res.errno == 0){
        that.setData({
          attribute: res.data.attribute,
          brand: res.data.brand,
          comment: res.data.comment,
          gallery: res.data.gallery,
          goodsInfo: res.data.info,
          issueList: res.data.issue,
          productList: res.data.productList,
          specificationList: res.data.specificationList,
          userHasCollect: res.data.userHasCollect
        })

        WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);

        that.getGoodsRelated();

      }else{

      }
    })
  },
  getGoodsRelated: function(){
    let that = this;
    util.request(api.GoodsRelated, {id: that.data.id}).then(res=>{
      console.log(res)
      if(res.errno == 0){
        that.setData({
          relatedGoods: res.data.goodsList
        })
      }
    })
  },

  switchAttrPop: function(){
    let that = this;
    if(that.data.openAttr == false){
      that.setData({
        openAttr: !that.data.openAttr
      })
    }
  },
  closeAttr: function(){
    let that = this;
    that.setData({
      openAttr: false
    })
  },
  addOrCannelCollect: function(){
    let that = this;
    util.request(api.CollectAddOrDelete,{typeId: 0,valueId: that.data.id},"POST").then(res=>{
      console.log(res)
      let _res = res;
      if(_res.errno == 0){
        if(_res.data.type == 'add'){
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          })
        }else{
          that.setData({
            'collectBackImage': that.data.noCollectImage
          })
        }
      }else{
        wx.showToast({
          image: '/images/icon_error.png',
          title: _res.errmsg,
          mask: true
        })
      }
    })
  },
  addToCart: function(){
    let that = this;
    if(that.data.openAttr == false){
      that.setData({
        openAttr: !that.data.openAttr
      })
    }else{
      if(!this.isCheckedAllSpec()){
        wx.showToast({
          image: '/images/icon_error.png',
          title: '请选择规格',
          mask: true
        });
        return false;
      }
    }
    //根据选中的规格，判断是否有对应的sku信息
    let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey());
    if(!checkedProduct || checkedProduct.length<=0){
      //找不到对应的product信息，提示没有库存
      wx.showToast({
        image: '/images/icon_error.png',
        title: '库存不足',
        mask: true
      });
      return false;
    }
    //验证库存
    if(checkedProduct.goods_number < that.data.number){
      wx.showToast({
        image: '/images/icon_error.png',
        title: '库存不足1',
        mask: true
      });
      return false;
    }
    //添加到购物车
    util.request(api.CartAdd,{goodsId: this.data.goodsInfo.id, number: this.data.number, productId: checkedProduct[0].id},"POST").then(res=>{
      console.log(res)
      if(res.errno == 0){
        wx.showToast({
          title: '添加成功'
        });
        that.setData({
          openAttr: !that.data.openAttr,
          cartGoodsCount: res.data.cartTotal.goodsCount
        });
      }else{
        wx.showToast({
          image: '/images/icon_error.png',
          title: res.errmsg,
          mask: true
        });
      }
    })
  },
  isCheckedAllSpec: function(){
    return !this.getCheckedSpecValue().some(function(v){
      if(v.valueId == 0){
        return true;
      }
    })
  },
  getCheckedProductItem: function(key){
    return this.data.productList.filter(function(v){
      console.log(v)
      if(v.goods_specification_ids == key){
        return true;
      }else{
        return false;
      }
    })
  },
  getCheckedSpecKey: function(){
    let that = this;
    let checkedValue = that.getCheckedSpecValue().map(function(v){
      return v.valueId;
    });
    return checkedValue.join('_');
  },
  // 获取选中的规格信息
  getCheckedSpecValue: function(){
    let that = this;
    let checkedValues = [];

    let _specificationList = that.data.specificationList;
    console.log(_specificationList)
    for(let i=0; i<_specificationList.kength; i++){
      let _checkedObj = {
        nameId: _specificationList[i].specification_id,
        valueId: 0,
        valueText: ''
      }
      for(let j=0; j<_specificationList[i].valueList.length; j++){
        if(_specificationList[i].valueList[j].checked){
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }
    return checkedValues;
  },
  toBrandDetail: function(){
    let that = this;
    let brandId = that.data.brand.brandId;
    util.showModal('','暂缺品牌列表页')
    // wx.navigateTo({
    //   url: '/pages/detail/brandDetail?id='+brandId
    // })
  },
  toCommentList: function(){
    let that = this;
    let valueId = that.data.goodsInfo.id
    wx.navigateTo({
      url: '/pages/comment/list?valueId='+valueId+'&typeId=0'
    })
  },
  cutNumber: function(){
    let that = this;
    that.setData({
      number: (that.data.number-1>1)?that.data.number-1:1
    })
  },
  addNumber: function(){
    let that = this;
    that.setData({
      number: that.data.number+1
    })
  },
  openCartPage: function(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  toBuy: function(){
    util.showModal('',"待开发")
  }
})