
var articleTemplate = function (article) {
    var t = `
    <div class="article-cell">
        <span class="article-title">${article.title}</span>
        <span class="article-img"><img src="${article.image}" height="200" width="200" alt="" /></span>
    </div>
    `
    return t
}

var insertArticles = function(articles) {
    var html = '<h2>素材预览</h2>'
    for (var i = 0; i < articles.length; i++) {
        var a = articles[i]
        var t = articleTemplate(a)
        html += t
    }
    var div = document.querySelector('.articles-list')
    div.innerHTML = html
}

var articlesAll = function() {
    var request = {
        method: 'GET',
        url: '/compass/api/articles',
        contentType: 'application/json',
        callback: function(response) {
            var articles = JSON.parse(response)
            insertArticles(articles)
        }
    }
    ajax(request)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var send = function(form) {
    console.log('浏览器群发')
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/wechat/api/send_listing_to_users',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            console.log('群发成功响应', response)
            var res = JSON.parse(response)
        }
    }
    ajax(request)
}

var getUsers = function() {
    console.log('浏览器拉取用户')
    var request = {
        method: 'get',
        url: '/wechat/api/users',
        contentType: 'application/json',
        callback: function(response) {
            console.log('用户响应', response)
            var openids = JSON.parse(response)
            e('#id-textarea-users').value = openids.join('\n')
        }
    }
    ajax(request)
}

var bindEvents = function() {
    var button = e('#id-button-send')
    button.addEventListener('click', function(event){
        var form = {
            openids: e('#id-textarea-users').value.split('\n').slice(0, 20),
        }
        send(form)
    })

    var userButton = e('#id-button-users')
    userButton.addEventListener('click', function(event){

        getUsers()
    })

}

var __main = function() {
    articlesAll()
    bindEvents()
}

__main()
