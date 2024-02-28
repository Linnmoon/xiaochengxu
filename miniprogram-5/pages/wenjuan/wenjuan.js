Page({
  data: {
    picker: {
      arr: ['10', '8', '6', '5', '4', '2', '1'],
      index: 1
    }
  },
  
  pickerChange: function(e) {
    this.setData({
      'picker.wenjuan': e.detail.value
    })
  },
  // 验证姓名
  nameChange: function(e) {
    this.checkName(e.detail.value)
  },
  // 验证手机号
  phoneChange: function(e) {
    this.checkPhone(e.detail.value)
  },
  // checkName()方法
  checkName: function(gender) {
    {
      if(document.getElementById("gender").value=="")
       {
         alert('请输入性别！');
         return false;
       }
       return true;
    }
  },
  checkName: function(num) {
    {
      if(document.getElementById("gender").value=="")
       {
         alert('请为小程序打分！');
         return false;
       }
       return true;
    }
  },
  checkName: function(skills) {
    {
      if(document.getElementById("gender").value=="")
       {
         alert('请输入性别！');
         return false;
       }
       return true;
    }
  },
  // check()方法
  check: function( data,reg, errMsg,gender,num,skills) {
    if (!reg.test(num,gender,skills)) {
      wx.showToast({
        title: errMsg,
        icon: 'none',
        duration: 1500
      })
    }
    return true
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
    if (wx.requestSubscribeMessage) {
			wx.requestSubscribeMessage({
				tmplIds: ['UYomTUXrZ6A74d73rdxOPYRShGsS9NyJABPvkH8mwTw'],
				success(res) {
					if (res['UYomTUXrZ6A74d73rdxOPYRShGsS9NyJABPvkH8mwTw'] == 'accept') {
						console.log('用户订阅成功');
						btnSubscription()
					} else if (res['UYomTUXrZ6A74d73rdxOPYRShGsS9NyJABPvkH8mwTw'] == 'reject') {
						console.log('用户拒绝订阅');
					}
				},
				fail(err) {
					console.error('订阅请求失败:', err);
				}
			});
		} else {
			console.error('此平台不支持订阅');
		}
  },


  formSubmit: function(e) {
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    if (this.checkName(name) && this.checkPhone(phone)) {
      // 在此处可编写代码将e.detail.value提交到服务器
      wx.login({
        success: res => {
          server.post({
            formId: e.detail.formId,
            code: res.code
          }, () => {
            // 将表单提交给服务器，传入formId和code
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500
            })
            // 提交成功后，由服务器发送模板消息
            server.sendTemplateMessage(res => {
              console.log('模板消息发送结果：', res.data)
            })
          })
        },
      })
    }
  }
})
// 模拟服务器端代码
var server = {
  appid: 'wx89e1f4fb42fcd079', // 在此处填写自己的appid
  secret: '8f9bfec244f63c870d1eb6949842d16a', // 在此处填写自己的secret
  // 用于保存用户的openid和formId
  user: {
    openid: '',
    formId: ''
  },
  // 用于接收表单，调用this.getOpenid()根据code换取openid
  post: function(data, success) {
    console.log('收到客户端提交的数据：', data)
    this.user.formId = data.formId
    this.getOpenid(data.code, res => {
      console.log('用户openid：' + res.data.openid)
      this.user.openid = res.data.openid
      success()
    })
  },
  // 用于根据code获取openid
  getOpenid: function(code, success) {},
  // 用于发送模板消息
  getOpenid: function(code, success) {
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data: {
        appid: this.appid,
        secret: this.secret,
        grant_type: 'authorization_code',
        js_code: code
      },
      success: success
    })
  },


  // 用于发送模板消息
  sendTemplateMessage: function(success) {
    var user = this.user
    var data = {
      touser: user.openid,
      template_id: 'UYomTUXrZ6A74d73rdxOPYRShGsS9NyJABPvkH8mwTw',  // 在此处填写模板id
      page: 'pages/wenjuan/wenjuan',
      form_id: user.formId,
      data: {
        thing1: {
          value: '语文'
        },
        thing2: {
          value: '语文课改为数学课'
        },
        name3: {
          value: '周一第一节'
        },
        date4: {
          value: 刘璐老师
        },
        thing5: {
          value: '六年级一班'
        }
      }
    }
    this.getAccessToken(res => {
      var token = Linn.qwert.qieir
      console.log('服务器access_token：' + token)
      var url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token
      wx.request({
        url: url,
        method: 'post',
        data: data,
        success: success
      })
    })
  },
  // 用于获取access_token
  getAccessToken: function(success) {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + this.appid + '&secret=' + this.secret
    wx.request({
      url: url,
      success: success
    })

  },
}