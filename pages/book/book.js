// pages/book/book.js
const config = getApp().globalData.config
const util = require('../../util/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist: [],
    noresult: false,
    pageNum: 1
  },

  // 获取数据
  getBookList (reload) {
    wx.request({
      url: `${config.xiaoceRequestUrl}/getListByLastTime`,
      data: {
        src: 'web',
        uid: '',
        device_id: '',
        token: '',
        pageNum: 1
      },
      success: (result)=>{
        let data = result.data
        if (data.s === 1) {
          let list = data.d 
          if (!util.isEmptyObj(list)) {
            let num = this.data.pageNum+1
            this.setData({
                pageNum: num,
                booklist: reload ? list : this.data.booklist.concat(list)
             })
          }
        }else {
          if (data.s === 2) {
            this.setData({
              noresult: true
            })
          }else {
            wx.showToast({
              title: '网络错误'
            });
          }
        }
      },
      fail: ()=>{
        wx.showToast({
          title: '网络错误'
        });
      },
      complete: ()=>{
        wx.stopPullDownRefresh()
      }
    });
  },


  onLoad: function () {
    this.getBookList(true)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      noresult: false
    })
    this.getBookList(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.booklist.length || !this.data.noresult) {
      this.getBookList()
    }
  },
})