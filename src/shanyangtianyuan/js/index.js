window.onload = function () {
  var submenu = document.getElementsByClassName("submenu");
  var box = document.getElementsByClassName("box");
  var boxPage = document.getElementsByClassName("box-page");
  var coldCard = boxPage[0].getElementsByClassName("card");
  var hotCard=boxPage[1].getElementsByClassName("card");
  var riceCard=box[1].getElementsByClassName("card");
  var afteaCard=box[2].getElementsByClassName("card");
  var cookingStep = document.getElementsByClassName("cooking-step")[0];
  var content = document.getElementsByClassName("content")[0];
  var holiday=document.getElementsByClassName("holiday")[0];
  var cookingText=document.getElementsByClassName("cooking-text")[0];
  var holiday=document.getElementsByClassName("holiday")[0];
  var weekDays = ['/shanyangtianyuan/images/day1.png', '/shanyangtianyuan/images/day2.png', '/shanyangtianyuan/images/day3.png', '/shanyangtianyuan/images/day4.png', '/shanyangtianyuan/images/day5.png', '/shanyangtianyuan/images/day6.png', '/shanyangtianyuan/images/day7.png'];
  //查找冷菜热菜
  var coldFood = [];
  var hotFood = [];
  for (var a = 0; a < homeMenu.length; a++) {
    homeMenu[a]['category'] == 1 && coldFood.push(homeMenu[a]);
    homeMenu[a]['category'] == 2 && hotFood.push(homeMenu[a]);
  }

  //生成家常菜菜品
  var mycoldMenu = '';
  for (var a = 0; a < coldFood.length; a++) {
    mycoldMenu += '<div class="card">' +
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
  var myhotMenu = '';
  for (var a = 0; a < hotFood.length; a++) {
    myhotMenu += '<div class="card">' +
      '<div class="card-text">' +
      '<div class="card-phtoto" style="background-image: url(' + hotFood[a]['img1'] + ')"></div>' +
      '<div class="card-bottom">' + hotFood[a]['name'] + '</div>' +
      '</div>' +
      '<div class="card-bg">' +
      '<div class="card-tan"></div>' +
      '<div class="card-white"></div>' +
      '</div>' +
      '</div>'
  }
  boxPage[0].innerHTML = mycoldMenu;
  boxPage[1].innerHTML = myhotMenu;
  //生成一天一道下饭菜
  var myriceMenu = '';
  for (var a = 0; a < riceMenu.length; a++) {
    myriceMenu += '<div class="card">' +
      '<div class="card-text">' +
      '<div class="card-header">' +
      '<div class="header-left">' +
      '<img class="week" src="'+ weekDays[a] +'" />'+
      '<div class="date"></div>' +
      '</div>' +
      ' <div class="header-text">' + riceMenu[a]['name'] + '</div>' +
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
  box[1].innerHTML = myriceMenu;

  //生成下午茶
  var myafternoonTea = '';
  for (var a = 0; a < afternoonTea.length; a++) {
    myafternoonTea += '<div class="card">' +
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
  box[2].innerHTML = myafternoonTea;

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
    holiday.className = 'holiday holiday-' + (arrIndex+1);
  }
  //点击菜单切换菜品
  for (var a = 0; a < submenu.length; a++) {
    submenu[a].subIndex = a;
    submenu[a].onclick = function () {
      changePage(box, submenu, this.subIndex);
    }
  }

//获取制作步骤的数据

  //点击图片显示制作步骤
  function click (arr,arr1) {
    console.log(arr1)
    for (var a = 0; a < arr.length; a++) {
      arr[a].index = a;
      arr[a].onclick = function () {
        console.log(this.index, 'index');
        cookingStep.className = 'cooking-step show';
        var stepList=document.getElementsByClassName("step-list")[0];
        var cookingimg=document.getElementsByClassName("cooking-img")[0];
        var addressHeader=document.getElementsByClassName("address-header")[0];
        var addressFoot=document.getElementsByClassName("address-foot")[0];
        var cookingStepCen=document.getElementsByClassName("cooking-step-cen")[0];
        cookingimg.src=arr1[this.index]['img2'];
        cookingText.innerHTML=arr1[this.index]['desc'];
        stepList.innerHTML=arr1[this.index]['cookie'];
        addressHeader.innerHTML=arr1[this.index]['advice'];
        addressHeader.href = 'https://uri.amap.com/marker?position='+arr1[this.index]['position']+'&name='+arr1[this.index]['advice']+'&coordinate=gaode&callnative=1';
        addressFoot.innerHTML=arr1[this.index]['address'];
       cookingStepCen.innerHTML=arr1[this.index]['name']+'制作方法';

        //关闭做菜步骤
        var close=document.getElementsByClassName("close")[0];
        close.onclick=function(){
          cookingStep.className='cooking-step';
        }
        
      }
    }
  }
  click(coldCard,coldFood);
  click(hotCard,hotFood);
  click(riceCard,riceMenu);
  click(afteaCard,afternoonTea);
 
  

}