// pages/index/index.js

const config = getApp().globalData.config
const utils = require('../../util/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    timeline: [],
  },

  // 数据请求部分
  // 获取首页数据
  getTimeline (reload) {
    let randIndex = ''
    if (utils.isEmptyObj(this.data.timeline)) {
      randIndex = ''
    }else{
      randIndex =  (this.data.timeline.slice(-1)[0].verifyCreatedAt) || ''
    }
    wx.request({
      url: `${config.timelineRequestUrl}/get_entry_by_timeline`,
      data: {
        src: 'web',
        uid: '',
        device_id: '',
        token: '',
        limit: 10,
        category: 'all',
        recomment: 1,
        before: randIndex
      },
      success: (res) => {
        // console.log(res)
        let data = res.data
        if ( data.s === 1) {
          wx.hideLoading()
          let list = (data.d && data.d.entrylist) || []
          this.setData({
             timeline: reload ? list : this.data.timeline.concat(list)
          })
        }else{
          wx.showToast({
            title: data.m.toString(),
          })
        }
      },
      fail: (res) => {
        console.log(res)
        wx.showToast({
          title: '网络开小差,请稍后重试',
        })
      },
      complete: () => {
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (utils.isEmptyObj(this.data.timeline)) {
      wx.startPullDownRefresh()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '开始加载中....',
    })
    this.getTimeline()
  },

   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载...',
    })
    this.getTimeline(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})