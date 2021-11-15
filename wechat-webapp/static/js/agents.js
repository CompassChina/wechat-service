var agentTemplate = function(agent) {
    var name = agent.name
    var region = agent.region
    var speaking_chinese = agent.speaking_chinese
    var t = `
    <div class="agent-cell">
        <ul>
            <li>姓名: ${name}</li>
            <li>地区: ${region}</li>
            <li>是否说中文: ${speaking_chinese ? '是' : '否'}</li>
        </ul>
    </div>
    `
    return t
}

var insertAgentAll = function(agents) {
    var html = ''
    for (var i = 0; i < agents.length; i++) {
        var b = agents[i]
        var t = agentTemplate(b)
        html += t
    }
    var div = document.querySelector('.agent-list')
    div.innerHTML = html
}

var agentAll = function() {
    var request = {
        method: 'GET',
        url: '/compass/api/agents',
        contentType: 'application/json',
        callback: function(response) {
            var agents = JSON.parse(response)
            window.agents = agents
            insertAgentAll(agents)
        }
    }
    ajax(request)
}


var __main = function() {
    // 载入 agent 列表
    agentAll()
}

__main()
