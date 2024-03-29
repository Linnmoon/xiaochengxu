var common = require('../wenjian/common')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
	  isAdd: false
  
	},
  
	/**
	 * 自定义函数--添加收藏
	 */
	addFavorites: function() {
	  // 获取新闻数据
	  let article = this.data.article
  
	  // 添加到本地缓存中
	  wx.setStorageSync(article.id, article)
  
	  // 更新按钮的显示
	  this.setData({
		isAdd: true
	  })
	},
  
	/**
	 * 自定义函数--取消收藏
	 */
	cancelFavorites: function() {
	  // 获取新闻数据
	  let article = this.data.article
  
	  // 从本地缓存中删除
	  wx.removeStorageSync(article.id)
  
	  // 更新按钮的显示
	  this.setData({
		isAdd: false
	  })
  
	},
  
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
	  // console.log(options.id)
  
	  // 获取页面跳转来时携带的新闻id
	  let id = options.id
  
	  // 检查当前新闻是否在收藏夹中
	  let article = wx.getStorageSync(id)
  
	  // 如果已经存在
	  if(article!=""){
		// 直接更新新闻数据
		this.setData({
		  article:article,
		  isAdd:true
		})
	  }
	  // 如果新闻不存在
	  else{
		// 获取新闻数据
		let result = common.getNewsDetail(id)
  
		// 更新新闻数据
		if (result.code == 200) {
		  this.setData({
			article: result.news
		  })
		}
	  }
  
  
	},
  
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
  
	},
  
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
  
	},
  
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {
  
	},
  
	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {
  
	},
  
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {
  
	},
  
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
  
	},
  
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {
  
	}
  })