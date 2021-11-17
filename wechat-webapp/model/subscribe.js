var fs = require('fs')


var subscribeFilePath = 'db/subscribe.json'


const ModelSubscribe = function(form) {
    this.openid = form.openid || ''
    this.region = form.region || ''
    this.created_time = Math.floor(new Date() / 1000)
}

const loadSubscribe = function() {
    var content = fs.readFileSync(subscribeFilePath, 'utf8')
    var subscribe = JSON.parse(content)
    return subscribe
}


const model = {
    data: loadSubscribe()
}

model.all = function() {
    const subscribe = this.data
    return subscribe
}

model.find_by_region = function(region) {
    const subscribes = this.all()
    const r = subscribes.filter((it) => {
       return it.region === region
    })
    return r
}

model.find_by_openid = function(openid) {
    const subscribes = this.all()
    const r = subscribes.filter((it) => {
       return it.openid === openid
    })
    return r
}

model.find = function(form) {
    const data = this.data.filter((it) => {
       return it.openid === form.openid && it.region === form.region
    })
    return data[0]
}

model.new = function(form) {
    if (this.find(form) !== undefined) {
        return {
            msg: '已订阅'
        }
    }
    var m = new ModelSubscribe(form)
    // 设置新数据的 id
    var d = this.data[this.data.length-1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }

    this.data.push(m)
    this.save()
    return m
}

model.remove = function(form) {
    const subscribeItem = this.find(form);
    if (subscribeItem === undefined) {
        return {
            msg: '您没有订阅该地区'
        }
    }
    this.data = this.data.filter((it) => !(it.openid  === form.openid && it.region === form.region))
    this.save();
    return subscribeItem;
}

model.save = function() {
    var s = JSON.stringify(this.data, null, 4)
    fs.writeFile(subscribeFilePath, s, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('保存成功')
      }
    })
}

module.exports = model
