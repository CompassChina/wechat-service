var agentTemplate = function (agent) {
    var t = `
    <div class="agent-cell">
        <ul>
            <li>姓名: ${agent.name}</li>
            <li>地区: ${agent.region}</li>
            <li>能否提供中文服务: ${agent.speaking_chinese ? '是' : '否'}</li>
            <li>服务年限: ${agent.service_years}</li>
            <li>服务人数: ${agent.service_people}</li>
            <li>成交量: ${agent.num_of_deals}</li>
            <li>评分: ${agent.rating}</li>
            <li>手机号: ${agent.phone_number}</li>
            <li>邮箱: ${agent.email}</li>
        </ul>
    </div>
    `
    return t
}

var insertAgentAll = function (agents) {
    var html = ''
    for (var i = 0; i < agents.length; i++) {
        var b = agents[i]
        var t = agentTemplate(b)
        html += t
    }
    var div = document.querySelector('.agent-list')
    div.innerHTML = html
}

var agentAll = function () {
    var request = {
        method: 'GET',
        url: '/compass/api/agents',
        contentType: 'application/json',
        callback: function (response) {
            var agents = JSON.parse(response)
            window.agents = agents
            insertAgentAll(agents)
        }
    }
    ajax(request)
}

var agentFilter = function (form) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/compass/api/agents/filter',
        contentType: 'application/json',
        data: data,
        callback: function (response) {
            var agents = JSON.parse(response)
            window.agents = agents
            insertAgentAll(agents)
        }
    }
    ajax(request)
}

var bindEvents = function () {
    var region = document.querySelector('#id-select-region')
    var canChinese = document.querySelector('#id-select-chinese')
    const chineseOptions = ['', true, false]
    region.addEventListener('change', function (e) {
        agentFilter({
            region: e.target.value,
            speaking_chinese: chineseOptions[canChinese.value],
        })
    })
    canChinese.addEventListener('change', function (e) {
        agentFilter({
            region: region.value,
            speaking_chinese: chineseOptions[e.target.value],
        })
    })
}

var __main = function () {
    // 载入 agent 列表
    agentAll()
    bindEvents()
}

__main()
