window.onload = function () {
  var introduce = {
    picture: ['/toupiao/images/mytrop.jpg', '/toupiao/images/mountain.png', '/toupiao/images/picture1.png', '/toupiao/images/picture2.png'],
    writer: '老李',
    organization: '上海市共青团委',
    name: '蜜蜂和好天气',
    text: '021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，农场大棚旁边盛开了很多桃树，蜜蜂嗡嗡围绕桃花飞舞，我凑近之后很碰巧的抓拍到了蜜蜂扑腾在花蕊间的瞬间，留下了这个自然清新又美好的画面。'
  };

  //封装一个函数展示图片
  function showPicture () {
    var swiperWrapper = document.getElementsByClassName(" swiper-wrapper")[0];
    var _html = ''
    for (var a = 0; a < introduce['picture'].length; a++) {
      _html += '<div class="swiper-slide"><img class="swiper-img" src="' + introduce['picture'][a] + '" alt=""></div>';
    }
    swiperWrapper.innerHTML = _html;
  }

  //生成html
  function setMessage (className, text) {
    var className = document.getElementsByClassName(className)[0];
    className.innerHTML = text;
  }
  //手机滑动
  function swiper () {
    var mySwiper = new Swiper('.swiper', {
      // direction: '', // 垂直切换选项
      loop: true, // 循环模式选项
      autoplay: {
        disableOnInteraction: false
      },
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
  }
  //给按钮添加点击事件 参与投票
  var joinBtn = document.getElementsByClassName("join-btn")[0];
  var dialogMmask = document.getElementsByClassName("dialog-mask");
  console.log(joinBtn, "joinbtn");
  function showdialog (show) {
    var show = document.getElementsByClassName(show)[0];
    show.style.display = 'block';
  }
  //点击 我知道了 关闭弹框
  function closewindow (mybtn, mywindow) {
    var btn = document.getElementsByClassName(mybtn)[0];
    var close = document.getElementsByClassName(mywindow)[0];
    btn.onclick = function () {
      close.style.display = 'none';
    }
  }
  closewindow("btn", "success");
  closewindow("btn-second", "failure");


  function getWorkDetail () {
    $.ajax({
      url: '/site/detail' + (/\.com/.test(location.host) ? '' : '.json') + '?id=' + window.$util.getQueryString('id'),
      data: {},
      dataType: 'json',
      type: 'get',
      success: function (res) {
        if (res.code == 200 && res.data) {
          var works_imgs = []
          try {
            works_imgs = JSON.parse(res.data.works_imgs)
          } catch(e) {
            works_imgs = []
          }
          console.log(res)
          introduce.picture = works_imgs
          introduce.writer = res.data.name || ''
          introduce.organization = res.data.work_place || ''
          introduce.name = res.data.works_name || ''
          introduce.text = res.data.works_description || ''
          showPicture();

          setMessage('writer', introduce['writer']);
          setMessage('company', introduce['organization']);
          setMessage("name", introduce['name']);
          setMessage("desc", introduce['text']);
          swiper();
        } else {
          window.$util.toast({ title: '系统异常，请稍后再试！' })
        }
      }
    })
  }

  getWorkDetail()

  // 绑定事件
  var btn = document.getElementsByClassName('join-btn')[0];
  var flag = false
  btn.onclick = function () {
    // 请求发起中， 不能再点了
    if (flag) return
    falg = true
    var appid = localStorage.getItem('appid')
    if (!appid) {
      appid = window.$$appid || parseInt(Math.random() * 100000000000)
      localStorage.setItem('appid', appid)
    }
    $.ajax({
      url: '/site/vote',
      data: {
        pid: window.$util.getQueryString('id'),
        appId: appid,
      },
      dataType: 'json',
      type: 'POST',
      success: function (res) {
        falg = false
        if (res.code == 200) {
          // 投票成功弹框
          showdialog('success');

        } else if (code == 500) {
          // 投票失败弹框
          showdialog('failure');
        } else {
          window.$util.toast({ title: '系统异常，请稍后再试！' })
        }
      },
      error: function () {
        falg = false
      }
    })
  }

  function is_weixn () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }

  var shareBtn = document.getElementsByClassName('voting-btn')[0];

  // 微信环境才展示分享按钮
  if (!is_weixn()) {
    shareBtn.style.display = 'none';
  } else {
    shareBtn.onclick = function() {
      // 微信分享 
      var guide = document.getElementsByClassName('guide')[0];
      guide.style.display = 'block';
    }
  }
}