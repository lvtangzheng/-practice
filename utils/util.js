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
function showModal(title,msg,showCancel,color){
  wx.showModal({
    title: title || "提示",
    content: msg,
    showCancel: showCancel || false,
    confirmColor: color || "#1aa2f6",
    success: function (res) {
    }
  })
}

/**
 * 获取微信小程序上一次历史记录
 */
function getPrevPage() {
  var prevPage;
  var pages = getCurrentPages();
  var pagesLength = pages.length;
  if (pagesLength >= 2) {
    prevPage = pages[pagesLength - 2];
  }
  return prevPage;
}
/**
 * 重置搜索条件参数
 */
function setDefaultSearchParams() {
  var searchParams = {
    q: null,
    page: 0,
    branch: null,
    craft: null,
    kepiao: null,
    keran: null,
    purpose: null,
    warehouse: null,
    area_id: 0,
    industry_id: 0,
    version: 49,
  };
  return searchParams;
}

module.exports = {
  formatTime: formatTime,
  checkMobile: checkMobile,
  showModal: showModal,
  getPrevPage: getPrevPage,
  setDefaultSearchParams: setDefaultSearchParams
}

