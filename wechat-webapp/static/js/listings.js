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

var e = function(selector) {
    return document.querySelector(selector)
}

var getOpenid = function () {
    var href = window.location.href
    var url = new URL(href);
    var openid = url.searchParams.get("openid");
    return openid
}


var subscribe = function(form) {
    console.log('浏览器订阅')
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/compass/api/subscribe/add',
        data: data,
        contentType: 'application/json',
        callback: function(response) {
            console.log('响应', response)
            var res = JSON.parse(response)
            var msg = res.msg || '订阅成功'
            e('#id-span-info').innerHTML = msg
        }
    }
    ajax(request)
}



var bindEvents = function() {
    var button = e('#id-button-subscribe')
    button.addEventListener('click', function(event){
        var form = {
            openid: getOpenid(),
            region: e('#id-input-region').value,
        }
        subscribe(form)
    })

}

var __main = function() {
    bindEvents()
}

__main()
