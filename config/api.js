const ApiRootUrl = 'http://10.1.1.165:8360/api/';
// const ApiRootUrl = 'http://192.168.0.101:8360/api/';

module.exports = {
	IndexUrl: ApiRootUrl + 'index/index',
	GoodsDetail: ApiRootUrl + 'goods/detail',
	GoodsRelated: ApiRootUrl + 'goods/related',
	CollectAddOrDelete: ApiRootUrl + 'collect/addordelete',
	CartAdd: ApiRootUrl + 'cart/add',
	CartList: ApiRootUrl + 'cart/index',
	CartChecked: ApiRootUrl + 'cart/checked',
	CartUpdate: ApiRootUrl + 'cart/update',
	CartDelete: ApiRootUrl + 'cart/delete',

	CartCheckout: ApiRootUrl + 'cart/checkout',//获取购物车商品

	CommentList: ApiRootUrl + 'comment/list',
	CommentCount: ApiRootUrl + 'comment/count',

	CatalogList: ApiRootUrl + 'catalog/index',//分类目录全部类目
	CatalogCurrent: ApiRootUrl + 'catalog/current',//分类目录当前分类数据
	GoodsCount: ApiRootUrl + 'goods/count',//商品总数
	GoodsCategory: ApiRootUrl + 'goods/category',//当前分类数据
	GoodsList: ApiRootUrl + 'goods/list',

	SearchIndex: ApiRootUrl + 'search/index',
	SearchClearHistory: ApiRootUrl + 'search/clearhistory',//清楚搜索历史记录
	SearchHelper: ApiRootUrl + 'search/helper',

	CollectList: ApiRootUrl + 'collect/list',
	AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin'//微信登录
}