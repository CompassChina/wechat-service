
const listings = require('../model/listings')
const subscribe = require('../model/subscribe')

const templateMessage = require('./templateMessage')

const allRegions = function () {
    let regions = subscribe.all().map(it => it.region)
    regions = [...new Set(regions)]
    return regions
}

const latestTime = function (objects) {
    if (objects[0] === undefined) {
        return 0
    }
    let t = objects[0].created_time
    for (var o of objects) {
        if (o.created_time > t) {
            t = o.created_time
        }
    }
    return t
}

const latestTimeOfSubscribe = function(region) {
    const objects = subscribe.find_by_region(region)
    return latestTime(objects)
}

const latestTimeOfListings = function(region) {
    const objects = listings.find_by_region(region)
    return latestTime(objects)
}

const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sendMessageToSubscribers = function(region, listing) {
    const openids = subscribe.find_by_region(region).map(it => it.openid)
    for (let openid of openids) {
        templateMessage.send(openid, listing)
    }
}

const subscribeCheck = function() {
    console.log('检查订阅')
    const regions = allRegions()
    for (let region of regions) {
        // 找到某个地区最晚订阅时间 t1
        // 找到某个地区最晚 listing 创建时间 t2
        // 如果 t2 < t1, 则需要创建一个该地区的 listing,
        // 并向每个该地区订阅用户发消息
        const t1 = latestTimeOfSubscribe(region)
        const t2 = latestTimeOfListings(region)
        if (t2 < t1) {
            // todo 添加更多假数据
            const form = {
                region: region,
                price: randomInt(6000, 9000),
            }
            const l = listings.new(form)
            sendMessageToSubscribers(region, l)
        }
    }
}

const SUBSCRIBE_CHECK_INTERVAL = 1 * 60 * 1000

const runSubscribeCheck = function () {
    setInterval(subscribeCheck, SUBSCRIBE_CHECK_INTERVAL)
}

module.exports.runSubscribeCheck = runSubscribeCheck
