var fs = require('fs')


var articleFilePath = 'db/articles.json'


const ModelArticle = function(form) {
    this.image = form.image || ''
    this.thumb_media_id = form.thumb_media_id || ''
    this.author = form.author || ''
    this.title = form.title || ''
    this.content = form.content || ''
    this.show_cover_pic = form.show_cover_pic || 1
    this.need_open_comment = form.need_open_comment || 1
    this.only_fans_can_comment = form.only_fans_can_comment || 1
    this.created_time = Math.floor(new Date() / 1000)
}

const loadArticle = function() {
    var content = fs.readFileSync(articleFilePath, 'utf8')
    var article = JSON.parse(content)
    return article
}


const model = {
    data: loadArticle()
}

model.prepareData = function(form) {
    const m = new ModelArticle(form)
    const p = 'db/html/' + m.content
    const html = fs.readFileSync(p, 'utf8')
    m.content = html
    delete m.id
    delete m.image
    return m;
}

model.all = function() {
    const article = this.data
    return article
}

model.find = function(id) {
    const article = this.data
    return article.filter((it) => {
       return it.id === id
   })[0];
}

model.update = function(listing) {
    const article = this.data
    for (var i = 0; i < article.length; i++) {
        const l = article[i]
        if (l.id === listing.id) {
            article[i] = listing
            break
        }
    }
    this.save()
}

model.new = function(form) {
    var m = new ModelArticle(form)
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

model.save = function() {
    var s = JSON.stringify(this.data, null, 4)
    fs.writeFile(articleFilePath, s, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('保存成功')
      }
    })
}

model.find_by_region = function(region) {
    const l = this.all()
    const r = l.filter((it) => {
       return it.region === region
    })
    return r
}

module.exports = model
