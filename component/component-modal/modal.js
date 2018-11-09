Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden
    modalMsg: {
      type: String,
      value: ' ',
    }
  },
  data: {
    // 这里是一些组件内部数据
    text: "text",
  },
  methods: {
    // 这里放置自定义方法
    modal_click_cancel: function () {
      this.setData({
        modalHidden: !this.data.modalHidden
      })
    },
    // 确定
    modal_click_sure: function () {
      this.triggerEvent("action");
      //triggerEvent函数接受三个值：事件名称、数据、选项值  
    }
  }
})
