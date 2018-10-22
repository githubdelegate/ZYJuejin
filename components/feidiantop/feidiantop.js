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
    }
  },

  attached: function () {
    console.log('top feidian', this.properties.item)
  }
})
