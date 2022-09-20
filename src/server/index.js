var request = require('request'),
    cache = require('memory-cache'),
    sha1 = require('sha1');

var config = require('./config').config;

var express = require('express');

var app = express();
app.use('/wx', express.static('static'));
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true); // ++ 新增
  // 设置可以跨域的请求方法
  res.header("Access-Control-Request-Method", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
app.get('/getsign', function (req, res) {
    var url = req.query.url
    console.log(url)
    var noncestr = config.noncestr,
        timestamp = Math.floor(Date.now() / 1000), //精确到秒
        jsapi_ticket;
    if (cache.get('ticket')) {
        jsapi_ticket = cache.get('ticket');
        // console.log('1' + 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url);
        obj = {
            noncestr: noncestr,
            timestamp: timestamp,
            url: url,
            jsapi_ticket: jsapi_ticket,
            signature: sha1('jsapi_ticket=' + jsapi_ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
        };
        res.send(obj)
    } else {  
        request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+config.appid+'&secret='+config.secret, function (error, response, body) {
            console.log('access_token error', error)
            console.log('access_token body', body)
            // console.log('access_token response', response)
            if (!error && response.statusCode == 200) {
                var tokenMap = JSON.parse(body);
                request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + tokenMap.access_token + '&type=jsapi', function (error, resp, json) {
                    console.log('getticket error', error)
                    console.log('getticket body', json)
                    // console.log('getticket response', resp)
                    if (!error && response.statusCode == 200) {
                        var ticketMap = JSON.parse(json);
                        cache.put('ticket', ticketMap.ticket, (1000 * 60 * 60 * 24));  //加入缓存
                        console.log('jsapi_ticket=' + ticketMap.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url);
                        obj = {
                            noncestr: noncestr,
                            timestamp: timestamp,
                            url: url,
                            jsapi_ticket: ticketMap.ticket,
                            signature: sha1('jsapi_ticket=' + ticketMap.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + url)
                        }
                        res.send(obj)
                    }
                })
            }
        })
    }
});

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});