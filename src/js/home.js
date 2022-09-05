window.onload = function () {
  joinBtn = document.getElementsByClassName("join-btn")[0];
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

  if (is_weixn()) {
    document.getElementById('weixin-tip').style.display = 'block';
  }
  //点击立即参加跳出弹框
  joinBtn.onclick = function () {
    upload.style.display = 'block';
  }
  //点击弹框的确认按钮关闭弹窗
  footerBtn.onclick = function () {
    upload.style.display = 'none';
    location.href = '/upload.html'
  }

  ruleBtn.onclick = function () {
    location.href = '/rule.html'
  }
}