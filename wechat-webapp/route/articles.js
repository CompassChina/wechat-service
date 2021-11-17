const listings = require('../model/listings')
const token = require('../model/token')
const article = require('../model/article')
const request  = require('../lib/request');

const sendMediaToUser = function(media_id, openid, response) {
    var form = {
       "touser": openid,
       "mpnews":{
          "media_id": media_id,
       },
        "msgtype":"mpnews",
        "send_ignore_reprint":0
    }

    var data = JSON.stringify(form)
    const t = token.getToken()
    const r = {
        method: 'POST',
        url: ` https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=${t}`,
        contentType: 'application/json',
        data: data,
        callback: function(r) {
            console.log('sendMediaToUsers', r)
            // const data = JSON.parse(response)
            // response.send(r)
        }
    }
    request.ajax(r)
}

const sendMediaToUsers = function(media_id, openids, response) {
    for (var openid of openids) {
        sendMediaToUser(media_id, openid, response)
    }
    response.send("{}")
}


var all = {
    path: '/compass/api/articles',
    method: 'get',
    func: function(request, response) {
        var articles = article.all()
        var r = JSON.stringify(articles)
        response.send(r)
    }
}

var send = {
    path: '/wechat/api/send_listing_to_users',
    method: 'post',
    func: function(request, response) {
        const form = request.body
        const openids = form.openids

        const media_id = "vtym7gn86_v4VEr92gx9HYAHMnS3wtPmhIIREuYaq8qzIOETVy3__C7XnXzESIv9"
        sendMediaToUsers(media_id, openids, response)
    }
}

var routes = [
    send,
    all,
]

module.exports.routes = routes
