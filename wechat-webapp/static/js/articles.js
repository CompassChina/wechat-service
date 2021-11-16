

var insertListing = function(articless) {
    var html = ''
    for (var i = 0; i < articless.length; i++) {
        var b = articless[i]
        var t = articlesTemplate(b)
        html += t
    }
    var div = document.querySelector('.articles-list')
    div.innerHTML = html
}

var articlesAll = function() {
    var request = {
        method: 'GET',
        url: '/compass/api/listings',
        contentType: 'application/json',
        callback: function(response) {
            var listings = JSON.parse(response)
            var listing = listings[0]
            insertListing(listing)
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
            console.log('响应', response)
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
            listing_id: window.listing_id,
        }
        send(form)
    })

    var userButton = e('#id-button-users')
    userButton.addEventListener('click', function(event){

        getUsers()
    })

}

var __main = function() {
    window.listing_id = 0
    bindEvents()
}

__main()
