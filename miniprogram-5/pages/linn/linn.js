// pages/linn/linn.js
Page({
    // 页面的初始数据
    data: {
      isShowUserName: false,
      userInfo: null,
      num: 0
    },
    //获取用户信息
    getUserProfile() {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log("获取用户信息成功", res)
          let user = res.userInfo
          wx.setStorageSync('user', user) //保存用户信息到本地缓存
          this.setData({
            isShowUserName: true,
            userInfo: user,
          })
          this.getMyFavorites()
        },
        fail: res => {
          console.log("获取用户信息失败", res)
        }
      })
    },
    onShow(options) {
      this.getUserProfile()
      var user = wx.getStorageSync('user'); //从本地缓存去用户信息
      if (user && user.nickName) { //如果本地缓存有信息就显示本地缓存
        this.setData({
          isShowUserName: true,
          userInfo: user,
        })
      }
    },
    getMyFavorites: function() {
        // 读取本地缓存信息
        let info = wx.getStorageInfoSync()
        // 获取全部的key信息
        let keys = info.keys
    
        // 获取新闻总数量
        let num = keys.length-2
    
        let myList = []
        for (var i = 0; i < num; i++) {
          let obj = wx.getStorageSync(keys[i])
          myList.push(obj)
        }
    
        // 更新新闻列表
        this.setData({
          newsList: myList,
          num: num
        })
    
    
      },
    
      /**
       * 自定义函数--跳转新页面浏览新闻内容
       */
      goToDetail: function(e) {
        // 获取新闻id
        let id = e.currentTarget.dataset.id
    
        // 跳转新页面
        wx.navigateTo({
          url: '../shouye/shouye?id=' + id,
        })
      },
    
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
    
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
        // 如果已经登录
        if (this.data.isLogin) {
          // 更新收藏列表
          this.getMyFavorites()
        }
    
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
