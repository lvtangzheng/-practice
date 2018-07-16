var app = getApp();

function initIndustryData(pageObj) {
  var industryCategoryData = {
    0: {
      0: { 'id': 1, 'icon': 'all@2x', 'name': '' },
      1: { 'id': 400, 'icon': 'pu-shu@2x', 'name': '普梳' },
      2: { 'id': 401, 'icon': 'gao-pei@2x', 'name': '高配' },
      3: { 'id': 403, 'icon': 'jing-shu@2x', 'name': '精梳' },
      4: { 'id': 405, 'icon': 'OE@2x', 'name': 'OE' },
      5: { 'id': 423, 'icon': 'nian@2x', 'name': '粘胶纤维' },
      6: { 'id': 446, 'icon': 'CVC@2x', 'name': '棉涤' },
      7: { 'id': 434, 'icon': 't-c@2x', 'name': '涤棉' },
    },
    1: {
      0: { 'id': 402, 'icon': 'ban@2x', 'name': '半精梳' },
      1: { 'id': 427, 'icon': 'tian-si@2x', 'name': '天丝' },
      2: { 'id': 447, 'icon': 'mo-dai-er@2x', 'name': '棉莫代尔' },
      3: { 'id': 514, 'icon': 'sha@2x', 'name': '涤纶纱' },
    }
  }
  pageObj.setData({
    industryCategoryData: industryCategoryData,
  });
}



module.exports = {
  initIndustryData: initIndustryData
}