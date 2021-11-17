var fs = require('fs')


var listingsFilePath = 'db/listings.json'


const ModelListings = function(form) {
    this.address = form.address || ''
    this.region = form.region || ''
    this.image = form.image || ''
    this.price = form.price || 0
    this.media_id = form.media_id || ''
    this.created_time = Math.floor(new Date() / 1000)
}

const loadListings = function() {
    var content = fs.readFileSync(listingsFilePath, 'utf8')
    var listings = JSON.parse(content)
    return listings
}


const model = {
    data: loadListings()
}

model.all = function() {
    const listings = this.data
    return listings
}

model.find = function(id) {
    const listings = this.data
    return listings.filter((it) => {
       return it.id === id
   })[0];
}

model.update = function(listing) {
    const listings = this.data
    for (var i = 0; i < listings.length; i++) {
        const l = listings[i]
        if (l.id === listing.id) {
            listings[i] = listing
            break
        }
    }
    this.save()
}

model.new = function(form) {
    var m = new ModelListings(form)
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
    fs.writeFile(listingsFilePath, s, (err) => {
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
