let twoLineHeight = null;

Component({
  properties: {
    text: {
      type: String,
      observer: function (newVal) {
        // 当它大于40的时候才需要判断
        if (newVal && newVal.length > 40) {
          console.log('>')
          // 设置一下延时，防止那些很卡的机子
          setTimeout(() => {
            this.getTextHeight();
          }, 100);
        }
      }
    }
  },
  data: {
    moreBtn: false,
    show: false
  },
  methods: {
    // 切换
    toggleHandler() {
      if (this.data.moreBtn) {
        this.setData({
          show: !this.data.show
        });
      }
    },
    getTextHeight() {
      this.getTwoLineHeight().then(lineHeight => {
        wx.createSelectorQuery().in(this).select('.motto-text').boundingClientRect(res => {
          // 如果签名内容高度大于计算出来的高度的话，那么就不止两行文字
          if (res.height > lineHeight) {
            this.setData({
              moreBtn: true
            });
          }
        }).exec();
      });
    },
    getTwoLineHeight() {
      if (twoLineHeight) {
        return twoLineHeight;
      } else {
        twoLineHeight = new Promise(resolve => {
          wx.createSelectorQuery().in(this).select('.two-height').boundingClientRect(res => {
            if (res) {
              console.log(res)

              // 多加1/4防止溢出
              resolve(Math.ceil(res.height * 5 / 4));
            } else {
              // 如果获取失败了，就需要自己计算了
              // 首先获取系统屏幕宽度
              const systemW = wx.getSystemInfoSync().screenWidth;
              // 然后计算出一行的行高
              const lineHeight = (systemW * 28 / 750) * 1.5;
              // 再算两行半的高度，多出的1/4行算是溢出安全距离
              resolve(Math.ceil(lineHeight * 2.5));
            }
          }).exec();
        });
        return twoLineHeight;
      }
    },
    // 组件item点击事件
    doItemEvent: function(){
      this.triggerEvent("action");
      //triggerEvent函数接受三个值：事件名称、数据、选项值  
    },
  }
});