window.onload = function () {
  var submenu = document.getElementsByClassName("submenu");
  var box = document.getElementsByClassName("box");
  var hotfood = document.getElementsByClassName("hotfood")[0];
  var weekDays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  //查找冷菜热菜
  var coldFood = [];
  var hotFood = [];
  for (var a = 0; a < homeMenu.length; a++) {
    homeMenu[a]['category'] == 1 && coldFood.push(homeMenu[a]);
    homeMenu[a]['category'] == 2 && hotFood.push(homeMenu[a]);
  }
 
  //生成家常菜菜品
  var _html = '';
  for (var a = 0; a < coldFood.length; a++) {
    _html += '<div class="card">' +
      '<div class="card-text">' +
      '<div class="card-phtoto" style="background-image: url(' + coldFood[a]['img1'] + ')"></div>' +
      '<div class="card-bottom">' + coldFood[a]['name'] + '</div>' +
      '</div>' +
      '<div class="card-bg">' +
      '<div class="card-tan"></div>' +
      '<div class="card-white"></div>' +
      '</div>' +
      '</div>'
  }
  box[0].innerHTML = _html;

  //生成一天一道下饭菜
  var myhtml='';
  for (var a = 0; a < riceMenu.length; a++) {
    myhtml += '<div class="card">' +
      '<div class="card-text">' +
      '<div class="card-header">' +
      '<div class="header-left">' +
      '<div class="week">'+ weekDays[a] +'</div>' +
      '<div class="date"></div>' +
      '</div>' +
      ' <div class="header-text">'+riceMenu[a]['name']+'</div>' +
      '</div>' +
      '<div class="card-phtoto" style="background-image: url(' + riceMenu[a]['img1'] + ')"></div>' +
      '<div class="card-bottom">' + riceMenu[a]['desc'] + '</div>' +
      '</div>' +
      '<div class="card-bg">' +
      '<div class="card-tan"></div>' +
      '<div class="card-white"></div>' +
      '</div>' +
      '</div>'
  }
  box[1].innerHTML=myhtml;

  //生成下午茶
  var myafternoonTea='';
  for (var a = 0; a < afternoonTea.length; a++) {
    myafternoonTea+= '<div class="card">' +
      '<div class="card-text">' +
      '<div class="card-phtoto" style="background-image: url(' + afternoonTea[a]['img1'] + ')"></div>' +
      '<div class="card-bottom">' + afternoonTea[a]['desc'] + '</div>' +
      '</div>' +
      '<div class="card-bg">' +
      '<div class="card-tan"></div>' +
      '<div class="card-white"></div>' +
      '</div>' +
      '</div>'
  }
  box[2].innerHTML=myafternoonTea;


  //默认
  box[0].className = "box active";
  submenu[0].className = "submenu activebg";
  //封装一个函数切换菜品
  function changePage (arr, arr1, arrIndex) {
    for (var a = 0; a < arr.length; a++) {
      arr[a].className = "box";
      arr1[a].className = "submenu"
      arr[arrIndex].className = "box active";
      arr1[arrIndex].className = "submenu activebg";
    }
  }
  //点击菜单切换菜品
  for (var a = 0; a < submenu.length; a++) {
    submenu[a].subIndex = a;
    submenu[a].onclick = function () {
      changePage(box, submenu, this.subIndex);
    }
  }

//点击图片显示制作步骤
function clickPhoto(arr){
  for(var a=0;a<arr.length;a++){
    arr[a].onclick=function(){

    }
  }
}

}