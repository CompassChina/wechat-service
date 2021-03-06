const agent = require('../model/agent')

var all = {
    path: '/compass/api/agents',
    method: 'get',
    func: function(request, response) {
        var agents = agent.all()
        var r = JSON.stringify(agents)
        response.send(r)
    }
}

var add = {
    path: '/compass/api/agent/add',
    method: 'post',
    func: function(request, response) {
        const form = request.body
        const b = agent.new(form)
        const r = JSON.stringify(b)
        response.send(r)
    }
}

var filter = {
    path: '/compass/api/agents/filter',
    method: 'post',
    func: function(request, response) {
        const form = request.body
        const b = agent.filter(form)
        const r = JSON.stringify(b)
        response.send(r)
    }
}

var getById = {
    path: '/compass/api/agent/:id',
    method: 'get',
    func: function(request, response) {
        const id = request.params.id * 1;
        const b = agent.getById(id)
        const r = JSON.stringify(b)
        response.send(r)
    }
}

var routes = [
    all,
    add,
    filter,
    getById,
]

module.exports.routes = routes
