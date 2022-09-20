window.onload = function () {
  joinBtn = document.getElementsByClassName("vote-btn")[0];
  ruleBtn = document.getElementsByClassName("rule-btn")[0];
  var upload = document.getElementsByClassName("upload")[0];
  var footerBtn = document.getElementsByClassName("footer-btn")[0];

  function is_weixn () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }
  //点击立即参加跳出弹框
  joinBtn.onclick = function () {
    location.href = '/toupiao/voting.html'
  }


  ruleBtn.onclick = function () {
    location.href = '/toupiao/voterule.html'
  }
}