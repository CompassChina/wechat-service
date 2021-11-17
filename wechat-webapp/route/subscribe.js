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

var routes = [
    all,
    add,
]

module.exports.routes = routes
