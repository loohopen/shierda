;(function() {
  window.$http = {
    get: function (url, query, callback) {
      // 如果有参数，先把参数拼接在url后面
      if (query) {
        url += '?'
        for (let key in query) {
          url += `${key}=${query[key]}&`
        }
        // 去除最后多余的那一个&
        url = url.slice(0, -1)
      }
      let xhr = new XMLHttpRequest()
      xhr.open('get', url)
      xhr.send()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            callback(xhr.responseText)
          }
        }
      }
    }
  }
})()