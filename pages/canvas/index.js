Page({
  data: {
    x: 0,
    y: 0,
    hidden: true
  },
  onLoad: function () {
    // const ctx0 = wx.createCanvasContext("myCanvas");
    // ctx0.setFillStyle("red");
    // ctx0.fillRect(10, 10, 150, 75);
    // ctx0.draw();

    const ctx1 = wx.createCanvasContext("myCanvas");
    const grd = ctx1.createLinearGradient(0, 0, 280, 150)
    grd.addColorStop(0, 'red')
    grd.addColorStop(0.16, 'orange')
    grd.addColorStop(0.33, 'yellow')
    grd.addColorStop(0.5, 'green')
    grd.addColorStop(0.66, 'cyan')
    grd.addColorStop(0.83, 'blue')
    grd.addColorStop(1, 'purple')
    ctx1.setFillStyle(grd)
    ctx1.fillRect(10, 10, 280, 180);
    ctx1.draw();

    // const ctx2 = wx.createCanvasContext("myCanvas");
    // const grd2 = ctx2.createCircularGradient(50, 50, 50)
    // grd2.addColorStop(0, 'red')
    // grd2.addColorStop(.5, 'orange')
    // grd2.addColorStop(1, 'white')
    // ctx2.setFillStyle(grd2);
    // ctx2.fillRect(0, 0, 100, 100)
    // ctx2.draw()

 
  },

  start: function (e) {
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  move: function (e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end: function (e) {
    this.setData({
      hidden: true
    })
  }
})