// pages/bookdetail/bookdetail.js
const WxParse = require('../../lib/wxParse/wxParse')
const config = getApp().globalData.config
const utils = require('../../util/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    author: {}, // 作者信息
    sections: [] // 章节
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.getAuthorInfo(id)
    this.getBookInfo(id)
  },

  getAuthorInfo(id) {
    wx.request({
      url: `${config.xiaoceCacheApiMs}/get`,
      data: {
        src: 'web',
        uid: '',
        client_id: '',
        token: '',
        id
      },
      success: (result)=>{
        let data = result.data
        if (data.s === 1) {
          let author = data.d
          if (!utils.isEmptyObj(author)) {
            this.setData({
              author,
            })

            wx.setNavigationBarTitle({
              title: author.title || '小册',
            })

            let article = (author.summaryHtml) || ''
            WxParse.wxParse('article', 'html', article, this)
          }else {
            wx.showToast({
              title: data.m.toString(),
              icon: 'none',
            });
          }
        }
      },
      fail: ()=>{
        wx.showToast({
          title: '网络错误',
          icon: 'none',
        });
      }
    });
  },

  getBookInfo (id) {
    wx.request({
      url: `${config.xiaoceCacheApiMs}/getListSection`,
      data: {
        src: 'web',
        uid: '',
        client_id: '',
        token: '',
        id
      },
      success: (result)=>{
        let data = result.data
        if (data.s === 1) {
          let sections = data.d
          if (!utils.isEmptyObj(sections)) {
            this.setData({
              sections
            })
          }
        }else {
          wx.showToast({
            title: data.m.toString(),
          })
        }
      },
      fail: ()=>{
        wx.showToast({
          title: '网络错误',
          icon: 'none',
        });
      },
    });
  },

  // 跳转都小册预览页面
  toProbation (e) {
    let  dataset = e.currentTarget.dataset
    let free = dataset.isfree
    if (free) {
      wx.navigateTo({
        url: `/pages/probation/probation?id=${dataset.sectionid}&isFree=${dataset.isfree}`,
      });
    }else {
      wx.showModal({
        content: '请去掘金网购买',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
      });
    }
  }
})