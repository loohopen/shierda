window.onload = function () {
  function getWorkList () {
    $.ajax({
      url: '/site/list' + (/\.com/.test(location.host) ? '': '.json'),
      data: {},
      dataType: 'json',
      type: 'get',
      success: function (res) {
        if (res.code == 200) {
          var datas = (res.data || []).map(item => {
            try {
              item.works_imgs = JSON.parse(item.works_imgs)
            } catch(e) {
              item.works_imgs = []
            }
            return item
          })
          setContentHtml(datas)
        }else {
          window.$util.toast({ title: '系统异常，请稍后再试！' })
        }
      }
    })
  }

  function setContentHtml (vote) {
    var content = document.getElementsByClassName("content")[0];
    var showHtml = '';
    for (var a = 0; a < vote.length; a++) {
      showHtml +=
        '<div class="card">' +
        (vote[a]['works_imgs'][0] ? '<div class="picture" data-id="'+ vote[a]['id'] + '" style="background-image:url(' + vote[a]['works_imgs'][0] + '?imageView2/1/w/622/h/400/interlace/1/q/85|imageslim)"></div>': '') +
        '<div class="write">' + vote[a]['works_name'] + '</div>' +
        '<div class="vote"> ' +
        '<div class="vote-num"><span class="num">' + vote[a]['voteNum'] + '</span><span class="text">票</span></div>' +
        '<div class="voting-btn" data-id="'+ vote[a]['id'] + '"></div>' +
        '</div>' +
        '</div>';
    }
    content.innerHTML = showHtml;

    // 绑定事件
    var btns = document.getElementsByClassName('voting-btn')
    for (let i = 0; i < btns.length; i++) {
      btns[i].onclick = function() {
        // 通过 dom 上设置 data-xxx=“YYY” 的值 可以通过dom.dataset.xxx获取到
        location.href = '/toupiao/introduce.html?id=' + this.dataset.id
      };
    }

    // 绑定事件
    var pictures = document.getElementsByClassName('picture')
    for (let i = 0; i < pictures.length; i++) {
      pictures[i].onclick = function() {
        // 通过 dom 上设置 data-xxx=“YYY” 的值 可以通过dom.dataset.xxx获取到
        location.href = '/toupiao/introduce.html?id=' + this.dataset.id
      };
    }
  }

  getWorkList()
}