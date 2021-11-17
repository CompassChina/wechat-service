const token = require('../model/token')
const article = require('../model/article')

const request  = require('../lib/request');

const upload = function() {
    const articles = article.all()
    const articlesData = articles.map((a) => {
       return article.prepareData(a)
    })

    var form = {
       "articles": articlesData,
    }
    var data = JSON.stringify(form)
    const t = token.getToken()
    const r = {
        method: 'POST',
        url: `https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=${t}`,
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            console.log('upload article response', response)
            // const data = JSON.parse(response)
            // callback(data.media_id)
        }
    }
    request.ajax(r)
}

module.exports.upload = upload
