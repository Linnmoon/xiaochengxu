var common = require('../wenjian/common')

Page({
    data: {
      "bnrUrl": [{
        "url": "/pages/image/lunbo1.jpg"
      }, {
          "url": "/pages/image/lunbo2.jpg"
      }, {
          "url": "/pages/image/lunbo3.jpg"
      },{
        "url": "/pages/image/lunbo4.jpg"
      }]
    },
	
	goToDetail: function (e) {
    // 获取新闻id
    let id = e.currentTarget.dataset.id
    // 跳转新页面
    wx.navigateTo({
      url: '/pages/shouye/shouye?id=' + e.currentTarget.dataset.id 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取新闻列表
    let list = common.getNewsList()
    // 更新新闻列表
    this.setData({
      newsList:list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
	}
})
