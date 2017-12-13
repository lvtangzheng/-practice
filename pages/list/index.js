//index.js
import listsAPI from '../../api/lists.js'
import carouselsAPI from '../../api/carousels.js'

//获取应用实例
const app = getApp()

Page({
  data: {
    hasMore: true,
    initLoading: false,
    reloading: false,
    autoplay: true,
    duration: 1000,
    interval: 5000,
    indicatorDots: true,
    lists : [],
    pages : 1,
    imgUrls: []
  },

  //事件处理函数
  // onVideoClick(event) {
  //   event.target.dataset.alphaBeta;
  //   wx.navigateTo({
  //     url: '../detail/index'
  //   })
  // },

  onLoad() {
    this.refresh();
    this.initCarousel();
  },

  initCarousel() {
    this.setData({
      imgUrls: carouselsAPI.loadCarousels()
    });
  },

  reloadLists() {
    this.setData({ reloading: true});
    const that = this;
    setTimeout(function () { that.refresh(); }, 2000);
  },

  loadMoreLists() {
    let that = this;
    setTimeout(() => {
      that.setData({
        lists: [...that.data.lists, ...listsAPI.loadLists(that.data.page, 10).data],
        page: that.data.page ++
      })
    }, 1000);

  },

  refresh() {
    this.setData({
      lists: listsAPI.loadLists(1, 10).data,
      page: 1,
      initLoading: false,
      reloading: false,
    });
  },

  // onPullDownRefresh: function () {
  //   console.log('onPullDownRefresh', new Date())
  // },
})