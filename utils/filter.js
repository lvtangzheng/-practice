/**
 * 获取和搜索相关的 纱线品类/工艺/用途/仓库 等信息
 */
var app = getApp();
// var network = require("./network.js");

/**
 *  获取top 10 仓库所在城市
 */
function getHotCity() {
  var hotCity = [
    { 'key': 114, 'value': '常州' },
    { 'key': 116, 'value': '南通' },
    { 'key': 185, 'value': '德州' },
    { 'key': 173, 'value': '青岛' },
    { 'key': 129, 'value': '绍兴' },
    { 'key': 112, 'value': '无锡' },
    { 'key': 239, 'value': '佛山' },
    { 'key': 124, 'value': '杭州' },
    { 'key': 186, 'value': '聊城' },
    { 'key': 178, 'value': '潍坊' },
    { 'key': 180, 'value': '泰安' },
    { 'key': 187, 'value': '滨州' },
    { 'key': 119, 'value': '盐城' },
    { 'key': 174, 'value': '淄博' },
    { 'key': 195, 'value': '新乡' }
  ];
  return hotCity;
}

/**
 * 获取常用纱线仓库所在城市
 */
function getHotCityCategory(pageObj) {
  var allCity = [
    {
		prefix: "B", 
		children: [
			{'id': "187", 'name': "滨州市"}, 
			{'id': "1", 'name': "北京"}
		]
	},
	{
		prefix: "C", 
		children: [
			{'id': "114", 'name': "常州市"}, 
			{'id': "150", 'name': "池州市"}, 
			{'id': "22", 'name': "重庆"}
		]
	},
	{
		prefix: "D", 
		children: [
			{id: "185", name: "德州市"}, 
			{id: "176", name: "东营市"}
		]
	},
	{
		prefix: "F", 
		children: [
			{id: "239", name: "佛山市"}
		]
	},
	{
		prefix: "H", 
		children: [
			{id: "188", name: "菏泽市"}, 
			{id: "124", name: "杭州市"}, 
			{id: "244", name: "惠州市"}
		]
	},
	{
		prefix: "J", 
		children: [
			{id: "127", name: "嘉兴市"}, 
			{id: "130", name: "金华市"}, 
			{id: "179", name: "济宁市"}
		]
	},
	{
		prefix: "K", 
		children: [
			{id: "190", name: "开封市"}
		]
	},
	{
		prefix: "L", 
		children: [
			{id: "186", name: "聊城市"}
		]
	},
	{
		prefix: "N", 
		children: [
			{id: "116", name: "南通市"}, 
			{id: "125", name: "宁波市"}
		]
	},
	{
		prefix: "P", 
		children: [
			{id: "192", name: "平顶山市"}
		]
	},
	{
		prefix: "Q", 
		children: [
			{id: "173", name: "青岛市"}, 
			{id: "41", name: "秦皇岛市"}
		]
	},
	{
		prefix: "S",
		children: [
			{id: "115", name: "苏州市"}, 
			{id: "129", name: "绍兴市"}, 
			{id: "39", name: "石家庄市"}, 
			{id: "9", name: "上海"}
		]
	},
	{
		prefix: "T", 
		children: [
			{id: "180", name: "泰安市"}, 
			{id: "40", name: "唐山市"}, 
			{id: "2", name: "天津"}
		]
	},
	{
		prefix: "W", 
		children: [
			{id: "178", name: "潍坊市"}, 
			{id: "362", name: "吴忠市"}
		]
	},
	{
		prefix: "X", 
		children: [
			{id: "113", name: "徐州市"}, 
			{id: "165", name: "新余市"}
		]
	},
	{
		prefix: "Y", 
		children: [
			{id: "119", name: "盐城市"}, 
			{id: "177", name: "烟台市"}, 
			{id: "169", name: "宜春市"}
		]
	},
	{
		prefix: "Z", 
		children: [
			{id: "175", name: "枣庄市"}
		]
	}
  ];
  return allCity;
}

/**
 * 获取默认的纱线分类数据
 */
function getDefaultIndustryCategory() {
  var industryJSON = require("../data/industry-data.js");
  console.log('loading..industryJSON....');
  return industryJSON.localIndustryData;
}

/**
 * 获取纱线品类(3级分类 解析本地industry json文件)
 */
function getIndustryCategoryFunctions(pageObj) {
  var that = this;
  var defaultIndustryCategory = that.getDefaultIndustryCategory();
  pageObj.setData({ industryCategory: defaultIndustryCategory });
}

/**
 * 获取纱线品类(3级分类)
 */
function getIndustryCategory(pageObj) {
  var that = this;
  var industryCategory;
  var dataKey = "INDUSTRY_CACHE";
  var timeKey = "INDUSTRY_TIMESTAMP_CACHE";
  var timestamp = wx.getStorageSync(timeKey) || new Date().getTime();
  var parameter = { timestamp: timestamp };
// ...
}

function activeIndustryCategory(pageObj) {
	console.log(pageObj)
  var that = this;
  var selectedIndustryLevel2 = 0;
  var selectedIndustryLevel3 = 0;
  var selectedIndustryLevel2Index = 0;
  var searchParams = wx.getStorageSync('searchParams') || {};
  var industryId = searchParams.industry_id || 0;
  var industryParentId = searchParams.industryParentId || 0;
  var defaultIndustryCategory = that.getDefaultIndustryCategory();
  if (!industryId) {
    pageObj.setData({
      selectedIndustryLevel2: selectedIndustryLevel2,
      selectedIndustryLevel3: selectedIndustryLevel3,
      selectedIndustryLevel2Index: selectedIndustryLevel2Index
    });
    return;
  }

  for (var i in defaultIndustryCategory) {
    var industryLevel2 = defaultIndustryCategory[i];

    if (industryId < 400) {
      if (industryLevel2['id'] == industryId) {
        selectedIndustryLevel2 = industryId;
        selectedIndustryLevel2Index = i;
        break;
      }
    } else {
      if (industryLevel2['id'] == industryParentId) {
        selectedIndustryLevel2 = industryParentId;
        selectedIndustryLevel3 = industryId;
        selectedIndustryLevel2Index = i;
        break;
      }
    }
  }
  pageObj.setData({
    selectedIndustryLevel2: selectedIndustryLevel2,
    selectedIndustryLevel3: selectedIndustryLevel3,
    selectedIndustryLevel2Index: selectedIndustryLevel2Index
  });
}
/**
 * 获取纱线工艺
 */
function getIndustryData() {
  var data = [];
  data.push({ 'key': '1', 'value': '不限' });
  data.push({ 'key': '400', 'value': '普梳' });
  data.push({ 'key': '401', 'value': '高配' });
  data.push({ 'key': '403', 'value': '精梳' });
  data.push({ 'key': '405', 'value': 'OE' });

  data.push({ 'key': '423', 'value': '粘胶纤维(人棉)' });
  data.push({ 'key': '446', 'value': '棉/涤(CVC)' });
  data.push({ 'key': '434', 'value': '涤/棉(TC)' });
  data.push({ 'key': '402', 'value': '半精梳' });
  data.push({ 'key': '427', 'value': '天丝' });
  data.push({ 'key': '447', 'value': '棉/莫代尔' });
  data.push({ 'key': '514', 'value': '涤纶纱' });

  return data;
}

/**
 * 获取可漂选项
 */
function getKepiaoOptions() {
  return ['可漂', '不可漂', '包漂'];
}

/**
 * 获取可染选项
 */
function getKeranOptions() {
  return ['可染', '不可染', '包染'];
}

/**
 * fetch branch data from network or local storage
 * branchType 0代表普通纱线 1代表化纤
 */
function getBranchData(branchType, successCallback, failCallback) {
  var that = this;
  var url = app.globalData.apiUrl + 'init/fetchCommonBranch';
  var timeKey = "COMMON_BRANCH_TIMESTAMP_CACHE";
  var dataKey = "COMMON_BRANCH_CACHE"
  var timestamp = wx.getStorageSync(timeKey);

  if (branchType == 1) {
    url = app.globalData.apiUrl + 'init/fetchFiberBranch';
    timeKey = "FIBER_BRANCH_TIMESTAMP_CACHE";
    dataKey = "FIBER_BRANCH_CACHE";
    timestamp = wx.getStorageSync(timeKey);

  }
  if (timestamp == null) {
    timestamp = new Date().getTime();
  }
  var parameter = {
    timestamp: timestamp
  };
}

/**
 * 获取默认的纱线工艺信息(离线情况下会使用)
 */
function getDefaultCraftData() {
  var craftData = [
    // 0普通纱线
    {
      'timeKey': 'COMMON_CRAFT_TIMESTAMP_CACHE',
      'dataKey': 'COMMON_CRAFT_CACHE',
      'data': ['赛络纺', '紧密纺', '紧密赛络纺', '环锭纺', '气流纺', '喷气涡流纺', '静电纺', '尘笼纺', '半精纺', '精纺', '粗纺']
    },
    // 1普通化纤
    {
      'timeKey': 'FIBER_CRAFT_TIMESTAMP_CACHE',
      'dataKey': 'FIBER_CRAFT_CACHE',
      'data': ['环锭纺', '喷气涡流纺', '气流纺', '紧密纺', '赛络纺', '紧密赛络纺', '静电纺', '尘笼纺', '精纺', '半精纺', '粗纺', '切片纺', '熔体纺', 'FDY', 'DTY', 'POY', 'ATY', 'DY', 'HOY', 'UDY', 'TY', 'MOY', 'ATY', '网络丝', '面包丝', '倍捻丝', '切片纺', '熔体纺']
    },
    // 2短纤
    {
      'timeKey': 'SPUN_CRAFT_TIMESTAMP_CACHE',
      'dataKey': 'SPUN_CRAFT_CACHE',
      'data': ['环锭纺', '喷气涡流纺', '气流纺', '紧密纺', '赛络纺', '紧密赛络纺', '静电纺', '尘笼纺', '精纺', '半精纺', '粗纺', '切片纺', '熔体纺']
    },
    // 3长丝
    {
      'timeKey': 'FILAMENT_CRAFT_TIMESTAMP_CACHE',
      'dataKey': 'FILAMENT_CRAFT_CACHE',
      'data': ['FDY', 'DTY', 'POY', 'ATY', 'DY', 'HOY', 'UDY', 'TY', 'MOY', 'ATY', '网络丝', '面包丝', '倍捻丝', '切片纺', '熔体纺']
    }
  ];

  return craftData;
}
/**
 * fetch craft data from network or local storage
 * craftType 0代表普通纱线 1代表化纤 2 短纤 3长丝
 */
function getCraftData(pageObj, craftType) {
  var that = this;
  var craftInfo = [];

  //判断当前所选择的纱线种类，默认为0（普通纱线）
  var currentCraftType = craftType || 0;

  //获取默认的纱线工艺数据
  var craftDefaultData = getDefaultCraftData();
  var currentCraftData = craftDefaultData[currentCraftType];

  pageObj.setData({ craftData: currentCraftData.data });
  return;
}

/**
 * 获取默认的纱线用途数据
 */
function getDefaultPurposeData() {
  return [
    '喷织用纱', '剑杆用纱', '针织用纱', '巾被用纱', '袜子用纱', '工业用纱', '特纱用', '牛仔用纱', '机织用纱', '针机两用', '色织布用', '青年布用', '米通用纱', '牛津布用', '灯芯绒用', '白坯纱用', '喷水织机', '纱卡用纱', '帆布用纱', '弹力布用'
  ];
}

/**
 * fetch purpose data from network or local storage
 */
function getPurposeData(pageObj) {
  var that = this;
  var purposeInfo;
  var defaultPurposeData = that.getDefaultPurposeData();
  pageObj.setData({ purposeData: defaultPurposeData });
  return;
}

module.exports = {
  getIndustryData: getIndustryData,
  getBranchData: getBranchData,
  getDefaultCraftData: getDefaultCraftData,
  getCraftData: getCraftData,
  getDefaultPurposeData: getDefaultPurposeData,
  getPurposeData: getPurposeData,
  getHotCity: getHotCity,
  getHotCityCategory: getHotCityCategory,
  getDefaultIndustryCategory: getDefaultIndustryCategory,
  getIndustryCategory: getIndustryCategory,
  activeIndustryCategory: activeIndustryCategory,
  getKeranOptions: getKeranOptions,
  getKepiaoOptions: getKepiaoOptions
}