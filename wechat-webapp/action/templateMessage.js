const request  = require('../lib/request');

const token = require('../model/token')

const send = function(openid, listing) {
    const template_id = "r_iuF76gOdSZ7tKJQeJkHpJ3amV9oeCCwdG8X6G5aSk"
    var form = {
           "touser": openid,
           "template_id": template_id,

           "data":{
                   "region": {
                       "value": listing.region,
                       "color":"#FF0000"
                   },
                   "price": {
                       "value": listing.price,
                       "color":"#008080"
                   },
           }
    }
    var data = JSON.stringify(form)
    const t = token.getToken()
    const r = {
        method: 'POST',
        url: `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${t}`,
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            console.log('sen template message 响应', response)
        }
    }
    request.ajax(r)
}

module.exports.send = send
