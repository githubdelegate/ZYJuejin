// pages/probation/probation.js
const config =  getApp().globalData.config
const WXParse = require('../../lib/wxParse/wxParse')
const utils = require('../../util/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    free: true,
    price: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id =  options.id
    this.getBookSection(id)
  },
   
  // 获取书章节的信息
  getBookSection (id) {
    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: `${config.xiaoceCacheApiMs}/getSection`,
      data: {
        src: 'web',
        uid:'',
        client_id:'',
        token: '',
        sectionId: id
      },
      success: (result)=>{
        wx.hideLoading();
        let data = result.data
        if (data.s === 1) {
          let d = data.d;
          if(!utils.isEmptyObj(d)) {

            this.setData({
              free: d.isFree
            })

            wx.setNavigationBarTitle({
              title: d.title || '试读',
            });
            let article = (d.html) || ''
            WXParse.wxParse('article', 'html', article, this)
          }
        }else{
          wx.showToast({
            title: data.m.toString()
          })
        }
      },
      fail: ()=>{
        wx.wx.showToast({
          title: '网络错误',
        });
      },
      complete: ()=>{}
    });

  }
})