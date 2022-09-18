window.onload = function () {
  var vote = [
    {
      id: '1',
      picture: '/toupiao/images/mytrop.jpg',
      write: '故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。',
      num: 1
    },
    {
      id: '2',
      picture: '/toupiao/images/mountain.png',
      write: '故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。',
      num: 22
    },
    {
      id: '3',
      picture: '/toupiao/images/mountain.png',
      write: '故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。',
      num: 22
    },
    {
      id: '4',
      picture: '/toupiao/images/mytrop.jpg',
      write: '故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。',
      num: 22
    }
  ];
  console.log("1");
  var content = document.getElementsByClassName("content")[0];
  var showHtml = '';
  for (var a = 0; a < vote.length; a++) {
    showHtml += 
    '<div class="card">' +
      '<div class="picture" style="background-image:url('+ vote[a]['picture'] + ')"></div>' +
      '<div class="write">' + vote[a]['write'] + '</div>' +
      '<div class="vote"> ' +
        '<div class="vote-num"><span class="num">' + vote[a]['num'] + '</span><span class="text">票</span></div>' +
        '<div class="voting-btn"></div>' +
      '</div>' +
    '</div>';
  }

  content.innerHTML = showHtml;
}