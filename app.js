App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systeminfo = res
      },
    })
  },

  globalData: {
    systeminfo: {},
    config: {
      loginRequestUrlByMobile: 'https://juejin.im/auth/type/phoneNumber',
      loginRequestUrlByEMail: 'https://juejin.im/auth/type/email',
      notifyRequestUrl: 'https://ufp-api-ms.juejin.im/v1',
      bannerRequestUrl: 'https://banner-storage-ms.juejin.im/v1',
      timelineRequestUrl: 'https://timeline-merger-ms.juejin.im/v1',
      xiaoceRequestUrl: 'https://xiaoce-timeline-api-ms.juejin.im/v1',
      xiaoceCacheApiMs: 'https://xiaoce-cache-api-ms.juejin.im/v1',
      postStorageApiMsRequestUrl: 'https://post-storage-api-ms.juejin.im/v1',
      userLikeWrapperMsRequestUrl: 'https://user-like-wrapper-ms.juejin.im/v1',
      // searchMergerMsRequestUrl: 'https://search-merger-ms.juejin.im/v1',
      collectionSetMsRequestUrl: 'https://collection-set-ms.juejin.im/v1',
      shortMsgMsRequestUrl: 'https://short-msg-ms.juejin.im/v1',
      ufpApiMsRequestUrl: 'https://ufp-api-ms.juejin.im/v1',
      lccroApiMsRequestUrl: 'https://lccro-api-ms.juejin.im/v1',
      entryViewStorageApiMsRequestUrl: 'https://entry-view-storage-api-ms.juejin.im/v1',
      goldTagMsRequestUrl: 'https://gold-tag-ms.juejin.im/v1',
      userNotificationApiMsRequestUrl: 'https://user-notification-api-ms.juejin.im/v1',
      apiRequestUrl: 'https://user-storage-api-ms.juejin.im/v1'
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
