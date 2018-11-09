var app = getApp()
Page({
  data: {
    is_modal_Hidden: true,
    is_modal_Msg: '我是一个自定义组件',
    list_data: [
      {txt:"唐诗，泛指创作于唐朝诗人所作的诗。唐诗是中华民族珍贵的文化遗产之一，是中华文化宝库中的一颗明珠，同时也对世界上许多民族和国情、风俗、文化等都有重要的参考意义和价值。","id":1},
      {txt:"唐诗的形式是多种多样的。唐代的古体诗，主要有五言和七言两种。近体诗也有两种，一种叫做绝句，一种叫做律诗。","id":2},
      {txt:"唐诗的形式是多种多样的。唐代的古体诗，主要有五言和七言两种。近体诗也有两种，一种叫做绝句绝句","id":3},
      {txt:"大近体诗也有两种,要有五言和七言两种。近体诗也有两种，弄得你d","id":4},
      {txt:"浪漫诗派\n代表人物：李白。\n特点： 以抒发个人情怀为中心，咏唱对自由人生主张自然，反对雕琢。\n代表作：\n李白：《月下独酌》、《梦游天姥吟留别》、《蜀道难》等。","id":5},
      {txt:"大近体诗也有两种,要有五言和七言两种。近体诗也有两种，弄得你d","id":4},
      {txt:"浪漫诗派\n代表人物：李白。\n特点： 以抒发个人情怀为中心，咏唱对自由人生主张自然，反对雕琢。\n代表作：\n李白：《月下独酌》、《梦游天姥吟留别》、《蜀道难》等。","id":5},
      {txt:"大近体诗也有两种,要有五言和七言两种。近体诗也有两种，弄得你d","id":4},
      {txt:"浪漫诗派\n代表人物：李白。\n特点： 以抒发个人情怀为中心，咏唱对自由人生主张自然，反对雕琢。\n代表作：\n李白：《月下独酌》、《梦游天姥吟留别》、《蜀道难》等。","id":5},
      {txt:"大近体诗也有两种,要有五言和七言两种。近体诗也有两种，弄得你d","id":4},
      {txt:"浪漫诗派\n代表人物：李白。\n特点： 以抒发个人情怀为中心，咏唱对自由人生主张自然，反对雕琢。\n代表作：\n李白：《月下独酌》、《梦游天姥吟留别》、《蜀道难》等。","id":5},
      {txt:"大近体诗也有两种,要有五言和七言两种。近体诗也有两种，弄得你d","id":4},
      {txt:"浪漫诗派\n代表人物：李白。\n特点： 以抒发个人情怀为中心，咏唱对自由人生主张自然，反对雕琢。\n代表作：\n李白：《月下独酌》、《梦游天姥吟留别》、《蜀道难》等。","id":5}
    ]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  // 组件点击弹框
  exFun: function(e){
    console.log('click')
    var clickItemTxt = this.data.list_data.filter(item=>item.id==e.target.dataset.id)[0].txt;
    var is_modal_Msg = this.data.is_modal_Msg
    this.setData({
      is_modal_Hidden: false,
      is_modal_Msg: clickItemTxt
    })
  },
  // 组件弹框独自确认事件
  doSure: function(e){
    console.log(e);
    this.setData({
      is_modal_Hidden: !this.data.is_modal_Hidden
    })
  }
})