// components/feidiantop/feidiantop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    intro: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击图片预览
    previewImage: function (e) {
      let dataset = (e.currentTarget || {}).dataset || {}
      let pics = dataset.pics || []
      let src = dataset.src
      if (pics.length) {
        wx.previewImage({
          current: src,
          urls: pics,
        });
      }
    },

    topicTap: function (e) {
      let dataset = e.currentTarget.dataset
      let url = dataset.url
      wx.setClipboardData({
        data: url,
        success: (result)=>{
          wx.showToast({
            title: '链接已复制,请用浏览器打开',
            icon: 'none',
            duration: 1500,
          });
        },
      });
    }
  },

  attached: function () {
  }
})
