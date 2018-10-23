// components/bookItem/bookItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached : function () {
    // console.log('book item ', this.properties.list)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tobookdetail (e) {
        let dataset = e.currentTarget.dataset
        let id = dataset.id
        wx.navigateTo({
          url: `/pages/bookdetail/bookdetail?id=${id}`,
          success: (result)=>{
            
          },
          fail: ()=>{},
          complete: ()=>{}
        });
    }
  }
})
