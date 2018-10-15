var GetUrlRelativePath = function (url) {
  var arrUrl = url.split('//');
  var start = arrUrl[1].indexOf('/') + 1;
  var relUrl = arrUrl[1].substring(start);
  if (relUrl.indexOf('?') != -1) {
    relUrl = relUrl.split('?')[0];
  }
  return relUrl;
}

// 获取 post id
// https://juejin.im/post/5b39bbcc5188252ce018c745
// 5b39bbcc5188252ce018c745 为 post id
var getPostIdByOriginalUrl = function (url) {
  return GetUrlRelativePath(url).split('/').slice(-1)[0]
};


let toPostDetail = (e) => {
  let item = e.currentTarget.dataset.item
  let postId = getPostIdByOriginalUrl(item.originalUrl)
  let entryId = item.objectId
  let t = item.type
  let url = ''
  let id = t === 'post' ? postId : entryId
  url = `/pages/post/post?id=${id}&type=${t}`
  wx.navigateTo({
    url: url,
  })
}

module.exports = {
  toPostDetail,
}