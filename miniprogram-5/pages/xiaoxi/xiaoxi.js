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
  acc:function() {
	uni.showModal({
		title: '通知权限',
		content: '请授权通知管理，用于给您及时传达消息',
		success: function(res) {
			if (res.confirm) {
				console.log('点击了确认')
				btnclick()
			} else {
				console.log('点击了取消')
			}
		}
	})
 },



 //!!!更改消息通知模板id的地方
 btnclick:function(e) {
	let templateId = 'UYomTUXrZ6A74d73rdxOPYRShGsS9NyJABPvkH8mwTw';
    wx.requestSubscribeMessage({ 
      tmplIds: [templateId],
      success (res) {
        console.log(res);
        if(res.UYomTUXrZ6A74d73rdxOPYRShGsS9NyJABPvkH8mwTw =='reject'){//被拒绝
 
        }else{//同意
					//获取缓存的open
          let opid = wx.getStorageSync('openid');
          //如果有OPID,直接发送
          if(opid){
          //执行保存到后台的操作
            that.saveSubMssage(opid,templateId);
          }else{
            
              wx.showToast({
                title: '需关联微信账号',
                icon: 'success',
                duration: 2000
              })
          //和登录授权一样
              wx.login({
                success: res => {
                  console.log(res);
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId  
                  request.post('后台换取用户id的接口', {
                    code: res.code
                  }).then((res) => {
                 //得到openid
                    let result = JSON.parse(res.result);
                    wx.setStorageSync('openid',result.openid)
                    opid=res.openid;
                   //执行保存到后台的操作
                    that.saveSubMssage(opid,templateId);
                  });
                }
              })
            }
        }
      },
      error(res){
        console.log(res);
        wx.showToast({
          title: '授权出现错误',
          icon: 'none',
          duration: 2000
        })
			},
			

			saveSubMssage(openid,tmplIds){
				let that = this;
				request.Post('后台保存用户同意消息推送的接口.do', {
					openId: openid,//用户openid
					templateId: tmplIds,//模板id
					userName: encodeURI(that.data.userName),//中文乱码处理
					idCard: that.data.idCard//身份证
				}).then((res) => {
					console.log(res);
					
					wx.showToast({
						title: '授权成功',
						icon: 'success',
						duration: 2000
					})
				
		 		 
		//退出页面
					setTimeout(function() {
							wx.navigateBack({ changed: true });
					}, 2000);
				});
		},				
					




 formSubmit: function(e) {
		wx.login({
			success: res => {
				console.log(res);
				// 发送 res.code 到后台换取 openId, sessionKey, unionId  
				request.post('后台用小程序id和密钥获取Openid的接口.do', {
					code: res.code
				}).then((res) => {
					console.log(res);
					let result = JSON.parse(res.result);
					wx.setStorageSync('openid',result.openid)//缓存openid
					that.setData({
						sessionKey: result.session_key
					})
				});
			}
		})
  }	

})
}
})