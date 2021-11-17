const subscribe = require('../model/subscribe')


var all = {
    path: '/compass/api/subscribe',
    method: 'get',
    func: function(request, response) {
        var s = subscribe.all()
        var r = JSON.stringify(s)
        response.send(r)
    }
}

var add = {
    path: '/compass/api/subscribe/add',
    method: 'post',
    func: function(request, response) {
        const form = request.body
        const b = subscribe.new(form)
        const r = JSON.stringify(b)
        response.send(r)
    }
}

var user = {
    path: '/compass/api/subscribe/user/:openid',
    method: 'get',
    func: function(request, response) {
        const openid = request.params.openid
        let r;
        if(!openid){
            r = JSON.stringify({ msg: 'openid不能为空' })
        }else{
            const b = subscribe.find_by_openid(openid)
            r = JSON.stringify(b)
        }
        response.send(r)
    }
}

var remove = {
    path: '/compass/api/subscribe/remove',
    method: 'post',
    func: function(request, response) {
        const form = request.body
        const b = subscribe.remove(form)
        const r = JSON.stringify(b)
        response.send(r)
    }
}

var routes = [
    all,
    add,
    user,
    remove,
]

module.exports.routes = routes
