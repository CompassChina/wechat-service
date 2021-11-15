
var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data){
        response.send(data)
    })
}

const agents = {
    path: '/compass/agents',
    method: 'get',
    func: function(request, response) {
        const path = 'agents.html'
        sendHtml(path, response)
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

const routes = [
    agents,
    listings,
]

module.exports.routes = routes
