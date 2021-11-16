const request  = require('../lib/request');
const token = require('../model/token')

const getUsers = function (callback) {
    //
    const t = token.getToken()
    const r = {
        method: 'GET',
        url: `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${t}`,
        contentType: 'application/json',
        callback: function(response) {
            console.log('获取 users', response)
            const data = JSON.parse(response)
            callback(data.data.openid)
        }
    }
    request.ajax(r)
}

var getMessage = {
    path: '/wechat/msg',
    method: 'get',
    func: function(request, response) {
        console.log('request', request);
        const echostr = request.query.echostr
        response.send(echostr)
    }
}

const valueFromXml = function(xml, key) {
//     <xml><ToUserName><![CDATA[gh_e9ce62223e99]]></ToUserName>
// <FromUserName><![CDATA[o0mlt5xCdop3gNRXe104bPKI26is]]></FromUserName>
// <CreateTime>1636813375</CreateTime>
// <MsgType><![CDATA[event]]></MsgType>
// <Event><![CDATA[subscribe]]></Event>
// <EventKey><![CDATA[]]></EventKey>
// </xml>


    const start = `<${key}><![CDATA[`
    const end = `]]></${key}>`
    if (!xml.includes(start)) {
        return undefined
    }
    const value = xml.split(start)[1].split(end)[0]
    return value
}

const isSubscribe = function (xml) {
    const MsgType = valueFromXml(xml, 'MsgType')
    const Event = valueFromXml(xml, 'Event')
    return MsgType === 'event' && Event === 'subscribe'
}

const isListingsClicked = function (xml) {
    // <Event><![CDATA[CLICK]]></Event>
    // <EventKey><![CDATA[EVENTKEY]]></EventKey>
    const Event = valueFromXml(xml, 'Event')
    const EventKey = valueFromXml(xml, 'EventKey')
    return Event === 'CLICK' && EventKey === 'LISTINGS';
}

const now = function () {
    const d = new Date()
    return d.getTime();
}

const welcomeMsg = function (xml) {
    const FromUserName = valueFromXml(xml, 'FromUserName')
    const ToUserName = valueFromXml(xml, 'ToUserName')
    const s = `
    <xml><ToUserName><![CDATA[${FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
    <CreateTime>${now()}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[欢迎关注 Compass 中文服务号👏👏]]></Content>
    <MsgId>1234567890123456</MsgId>
    </xml>
    `
    return s
}

var postMessage = {
    path: '/wechat/msg',
    method: 'post',
    func: function(request, response) {
        var buffer = [];
        //监听 data 事件 用于接收数据
        request.on('data',function(data){
            buffer.push(data);
        });
        //监听 end 事件 用于处理接收完成的数据
        request.on('end',function(){
        //输出接收完成的数据
            const xml = Buffer.concat(buffer).toString('utf-8')

            if (isSubscribe(xml)) {
                // 响应公众号关注事件
                const s = welcomeMsg(xml)
                response.send(s)
            } else {
                const s = ''
                response.send(s)
            }

        });

    }
}

const users = {
    path: '/wechat/api/users',
    method: 'get',
    func: function(request, response) {
        console.log('api users');
        getUsers(function (openids) {
            var r = JSON.stringify(openids)
            response.send(r)
        })

    }
}

var routes = [
    getMessage,
    postMessage,
    users,
]

module.exports.routes = routes
