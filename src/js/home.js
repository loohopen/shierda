window.onload=function(){
  joinBtn=document.getElementsByClassName("join-btn")[0];
  var upload=document.getElementsByClassName("upload")[0];
  var container=document.getElementsByClassName("container")[0];
  var footerBtn=document.getElementsByClassName("footer-btn")[0];
  //点击立即参加跳出弹框
  joinBtn.onclick=function(){
    console.log(upload,"1");
    upload.style.display='block';
  }
  //点击弹框的确认按钮关闭弹窗
  footerBtn.onclick=function(){
    upload.style.display='none';
  }
}