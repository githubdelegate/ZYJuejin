// pages/hot/hot.js
const config = getApp().globalData.config
const utils = require('../../util/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    COUNT: 30,
    swiperHeight: 'auto',
    recommendList: [],
    list: [],
    auth: {},
    scrollTop: 0
    },

  // 获取热门沸点 列表
  getHotRecommendList () {
    const auth = this.data.auth
    wx.request({
      url: `${config.shortMsgMsRequestUrl}/getHotRecommendList`,
      data: {
        uid: auth.uid,
        device_id: auth.clientId,
        client_id: auth.client_id,
        token: auth.token,
        src: 'web',
      },
      success: (result)=>{
        let data = result.data
        if (data.s === 1) {
          this.setData({
            recommendList: (data.d && data.d.list) || [],
          })
        }else {
          wx.showToast({
            title: data.m.toString(),
            icon: 'none'
          })
        }
      },
      fail: ()=>{
        wx.showToast({
          title: '网络错误',
          icon: 'none',
        });
      },
      complete: ()=>{
        wx.stopPullDownRefresh()
      }
    });
  },
  // 获取普通沸点列表
  getList (reload) {
    let list = this.data.list
    let createAt = undefined
    if (utils.isEmptyObj(list)) {
      createAt = ''
    }else{
      createAt =  (list.slice(-1)[0].createdAt) || ''
    }
    var reqTask = wx.request({
      url: `${config.shortMsgMsRequestUrl}/pinList/recommend`,
      data: {
        src: 'web',
        limit: this.data.COUNT,
        before: createAt
      },
      success: (result)=>{
        let data = result.data
        if (data.s === 1) {
          wx.hideLoading();
          let list = (data.d && data.d.list) || []
          this.setData({
            list: reload ? list : this.data.list.concat(list)
          })
        }else{
          wx.showToast({
            title: data.m.toString(),
          });
        }
      },
      fail: ()=>{
        wx.showToast({
          title: '网络错误',
        })
      },
      complete: ()=>{
        wx.stopPullDownRefresh()
      }
    });
  },
  initSwiper () {
    wx.getSystemInfo({
      success: (result)=>{
        this.setData({
          swiperHeight: `${(result.windowWidth || result.screenWidth) / 375 * 135}px`
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  init () {
    this.setData({
      auth: {},
    })
    this.initSwiper()
    this.getHotRecommendList()
    this.getList(true)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (utils.isEmptyObj(this.data.recommendList)) {
      wx.startPullDownRefresh({
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.init()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})