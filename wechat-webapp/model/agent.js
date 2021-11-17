var fs = require('fs')


var agentFilePath = 'db/agents.json'


const ModelAgent = function (form) {
    this.name = form.name || ''
    this.region = form.region || ''
    this.speaking_chinese = form.speaking_chinese || false
    this.service_years = form.service_years || ''
    this.service_people = form.service_people || ''
    this.num_of_deals = form.num_of_deals || ''
    this.rating = form.rating || ''
    this.phone_number = form.phone_number || ''
    this.email = form.email || ''
    this.created_time = Math.floor(new Date() / 1000)
}

const loadAgents = function () {
    var content = fs.readFileSync(agentFilePath, 'utf8')
    var agents = JSON.parse(content)
    return agents
}


const model = {
    data: loadAgents()
}

model.all = function () {
    const agents = this.data
    return agents
}

model.new = function (form) {
    var m = new ModelAgent(form)
    // 设置新数据的 id
    var d = this.data[this.data.length - 1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }

    this.data.push(m)
    this.save()
    return m
}

model.save = function () {
    var s = JSON.stringify(this.data)
    fs.writeFile(agentFilePath, s, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('保存成功')
        }
    })
}

model.filter = function ({ region, speaking_chinese = '' }) {
    const agents = this.data
    const result = agents.filter(e => {
        return (!region || e.region === region) && (speaking_chinese === '' || e.speaking_chinese === speaking_chinese)
    })
    return result
}

module.exports = model
