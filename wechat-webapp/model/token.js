var fs = require('fs')


var tokenFilePath = 'db/token.json'


const ModelToken = function(form) {
    this.access_token = form.access_token || ''
    this.expires_in = form.expires_in || 0
    this.expired_time = Math.floor(new Date() / 1000) + this.expires_in
}

const loadtoken = function() {
    const content = fs.readFileSync(tokenFilePath, 'utf8')
    const token = JSON.parse(content)
    return token
}


const model = {
    data: loadtoken()
}

// model.all = function() {
//     var tokens = this.data
//     // 遍历 token，插入 comments
//     const comment = require('./comment')
//     var comments = comment.all()
//     for (var i = 0; i < tokens.length; i++) {
//         var token = tokens[i]
//         var cs = []
//         for (var j = 0; j < comments.length; j++) {
//             var c = comments[j]
//             if (token.id == c.token_id) {
//                 cs.push(c)
//             }
//         }
//         token.comments = cs
//     }
//     return tokens
// }

model.new = function(form) {
    const m = new ModelToken(form)
    this.data = m
    this.save()
    // 返回新建的数据
    return m
}

model.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(tokenFilePath, s, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('保存成功')
      }
    })
}

module.exports = model
