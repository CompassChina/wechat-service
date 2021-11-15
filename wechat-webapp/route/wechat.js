

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
            let s = ''
            if (isSubscribe(xml)) {
                // 响应公众号关注事件
                s = welcomeMsg(xml)
            }
            response.send(s)
        });

    }
}

var routes = [
    getMessage,
    postMessage,
]

module.exports.routes = routes
