window.onload = function () {
  var introduce = {
    picture: ['/toupiao/images/mytrop.jpg', '/toupiao/images/mountain.png', '/toupiao/images/picture1.png', '/toupiao/images/picture2.png'],
    writer: '老李',
    organization: '上海市共青团委',
    name: '蜜蜂和好天气',
    text: '021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，农场大棚旁边盛开了很多桃树，蜜蜂嗡嗡围绕桃花飞舞，我凑近之后很碰巧的抓拍到了蜜蜂扑腾在花蕊间的瞬间，留下了这个自然清新又美好的画面。'
  };
var text=['老李','上海市共青团委','蜜蜂和好天气','021年3月摄于上海奉贤区，生态循环农业示范基地。正值春暖花开时节，农场大棚旁边盛开了很多桃树，'];

  //封装一个函数展示图片
  function showPicture () {
    var swiperWrapper = document.getElementsByClassName(" swiper-wrapper")[0];
    var _html = ''
    for (var a = 0; a < introduce['picture'].length; a++) {
      _html += '<div class="swiper-slide"><img class="swiper-img" src="' + introduce['picture'][a] + '" alt=""></div>';
    }
    swiperWrapper.innerHTML = _html;
    console.log("11");
  }
  showPicture();

  //生成html
  // writer-name
  // var swiperWrapper = document.getElementsByClassName(" swiper-wrapper")[0];
  function setMessage(className, text){
      var className=document.getElementsByClassName(className)[0];
        className.innerHTML= text;
    
  }

setMessage('writer', introduce['writer']);
setMessage('company', introduce['organization']);
setMessage("name",introduce['name']);
setMessage("desc",introduce['text']);
  function swiper () {
    var mySwiper = new Swiper('.swiper', {
      // direction: '', // 垂直切换选项
      loop: true, // 循环模式选项

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

  swiper();
}