;(function(){
  window.$util = {}
  var Toast = function(options) {
    options = options || {}
    var title = options.title || 'Toast组件'
    var duration = options.duration || 2000
    var div = document.createElement('div')
    div.classList.add('toast')
    div.innerText = title
    document.body.appendChild(div)
    var timer
    timer = setTimeout(function(){
      clearTimeout(timer)
      document.body.removeChild(div)
    }, duration)
  }
  window.$util.toast = Toast
})();