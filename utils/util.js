function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//检查手机号 判断字符串是否为手机号的模式
function checkMobile(mobile) {
  var mobileCheckPattern = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
  if (mobile == "") {
    return false;
  } else {
    if (!mobileCheckPattern.test(mobile)) {
      return false;
    }
    return true;
  }
}
// wx.showModal()组件
function showModal(title,msg,showCancel){
  wx.showModal({
    title: title,
    content: msg,
    showCancel: showCancel,
    confirmColor: "#1aa2f6",
    success: function (res) {
    }
  })
}



module.exports = {
  formatTime: formatTime,
  checkMobile: checkMobile,
  showModal: showModal
}

