const listings = require('../model/listings')


var all = {
    path: '/compass/api/listings',
    method: 'get',
    func: function(request, response) {
        var listings = listings.all()
        var r = JSON.stringify(listings)
        response.send(r)
    }
}

var add = {
    path: '/compass/api/listings/add',
    method: 'post',
    func: function(request, response) {
        const form = request.body
        const b = listings.new(form)
        const r = JSON.stringify(b)
        response.send(r)
    }
}

var routes = [
    all,
    add,
]

module.exports.routes = routes
