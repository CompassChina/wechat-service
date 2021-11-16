const listings = require('../model/listings')
const token = require('../model/token')
const request  = require('../lib/request');

const uploadListing = function(listing, callback) {
    const l = listing
    var form = {
       "articles": [
            {
                "thumb_media_id":"60sjimv0uZQln9u2-loiRxXbJOvdFZxiBpNkjF5w3gGN0_0sW_-UtnW_S1djDIzH",
                "author":"Compass",
                "title": `${l.address}`,
                "content": `
                    <img src="http://101.35.10.148/${l.image}" alt="" />
                `,
                "show_cover_pic":1,
                "need_open_comment":1,
                "only_fans_can_comment":1
            },
       ]
    }
    var data = JSON.stringify(form)
    const t = token.getToken()
    const r = {
        method: 'POST',
        url: `https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=${t}`,
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            console.log('uploadListing', response)
            const data = JSON.parse(response)
            callback(data.media_id)
        }
    }
    request.ajax(r)
}

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

const sendListingToUsers = function(listing, openids, response) {
    var form = {
        "filter":{
       "is_to_all":true,
       "tag_id":2
    },
       "msgtype": "text",
       "text": { "content": "hello from boxer."}
    }

    var data = JSON.stringify(form)
    const t = token.getToken()
    const r = {
        method: 'POST',
        url: `https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=${t}`,
        contentType: 'application/json',
        data: data,
        callback: function(r) {
            console.log('send text to users response', r)
            // const data = JSON.parse(response)
            response.send(r)
        }
    }
    request.ajax(r)
}


var all = {
    path: '/compass/api/agents',
    method: 'get',
    func: function(request, response) {
        var agents = agent.all()
        var r = JSON.stringify(agents)
        response.send(r)
    }
}

var send = {
    path: '/wechat/api/send_listing_to_users',
    method: 'post',
    func: function(request, response) {
        const form = request.body
        const openids = form.openids
        const listing_id = form.listing_id
        const l = listings.find(listing_id)
        console.log('选出来的 l', l)

        const media_id = l.media_id
        if (media_id === "") {
                uploadListing(l, function(media_id) {
                console.log('上传后的 media_id', media_id)
                l.media_id = media_id
                listings.update(l)

                sendMediaToUsers(media_id, openids, response)
            })
        } else {
            sendMediaToUsers(media_id, openids, response)
        }

        // sendListingToUsers(l, openids, response)
    }
}

var routes = [
    send,
]

module.exports.routes = routes
