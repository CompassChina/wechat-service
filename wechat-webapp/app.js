var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")

app.use(bodyParser.json())
app.use(express.static('static'))
app.use(cookieParser())

const request  = require('./lib/request');

const token = require('./model/token')

const subscribe = require('./action/subscribe')
const article = require('./action/article')


// Todo move it to a separated file
const getAccessToken = function() {
    const r = {
        method: 'GET',
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa7c80e98abaf8cf8&secret=98300ab7eecca06298310fa0ebf4b5bf',
        contentType: 'application/json',
        callback: function(response) {
            console.log('获取 access token 响应', response)
            const data = JSON.parse(response)
            const t = token.new(data)
            createMenu(t)
        }
    }
    request.ajax(r)
}

// Todo move it to a separated file
const createMenu = function(token) {
    var form = {
        "button":[
        {
             "type":"view",
             "name":"经纪人",
             "url":"http://101.35.10.148/compass/agents"
         },
         {
              "type":"view",
              "name":"房源",
              "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa7c80e98abaf8cf8&redirect_uri=http://101.35.10.148/compass/auth&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
          }
      ]
    }
    var data = JSON.stringify(form)
    const t = token.access_token
    const r = {
        method: 'POST',
        url: `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${t}`,
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            console.log('create menu 响应', response)
        }
    }
    request.ajax(r)
}


const registerRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        app[route.method](route.path, route.func)
    }
}

const registerAllRoutes = function() {
    const routeModules = [
        './route/subscribe',
        './route/articles',
        './route/wechat',
        './route/compass',
        './route/agent',
    ]
    for (const routeModule of routeModules) {
        const route = require(routeModule)
        registerRoutes(app, route.routes)
    }
}

const setupApp = function () {
    var server = app.listen(80, function () {
      var host = server.address().address
      var port = server.address().port
      console.log(`应用实例，访问地址为 http://${host}:${port}`)
    })
}

const __main = function() {
    getAccessToken()
    registerAllRoutes()
    setupApp()
    subscribe.runSubscribeCheck()
    // article.upload()
}
__main()
