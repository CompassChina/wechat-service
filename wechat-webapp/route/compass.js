
const request  = require('../lib/request');

var sendHtml = function(path, response, replace) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data) {
        if (replace !== undefined) {
            for (var key in replace) {
                data = data.replace(key, replace[key])
            }
        }
        response.send(data)
    })
}

const getOpenidByCode = function (code, callback) {
    //
    const r = {
        method: 'GET',
        url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxa7c80e98abaf8cf8&secret=98300ab7eecca06298310fa0ebf4b5bf&code=${code}&grant_type=authorization_code`,
        contentType: 'application/json',
        callback: function(response) {
            console.log('获取 open id', response)
            const data = JSON.parse(response)
            callback(data.openid)
        }
    }
    request.ajax(r)
}

const agents = {
    path: '/compass/agents',
    method: 'get',
    func: function(request, response) {
        // const path = 'agents.html'
        // sendHtml(path, response)
        response.redirect('/m/agents')
    }
}

const listings = {
    path: '/compass/listings',
    method: 'get',
    func: function(request, response) {
        const path = 'listings.html'
        sendHtml(path, response)
    }
}


const auth = {
    path: '/compass/auth',
    method: 'get',
    func: function(request, response) {
        console.log('get listings query', request.query)
        const code = request.query.code
        getOpenidByCode(code, function(openid) {
            console.log('openid', openid);
            // response.redirect(`/compass/listings?openid=${openid}`)
            response.redirect(`/m/listings?openid=${openid}`)
        })
    }
}


const articles = {
    path: '/compass/update_articles',
    method: 'get',
    func: function(request, response) {
        const path = 'articles.html'
        sendHtml(path, response)
    }
}

const routes = [
    agents,
    listings,
    articles,
    auth,
]

module.exports.routes = routes
