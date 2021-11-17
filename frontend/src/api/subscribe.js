import ajax from "../lib/ajax";

export function addSubscribeApi({ region, openid }) {
    return ajax.post('/compass/api/subscribe/add', { region, openid }).then(res=>{
        return res.data;
    })
}

export function removeSubscribeApi({ region, openid }) {
    return ajax.post('/compass/api/subscribe/remove', { region, openid }).then(res=>{
        return res.data;
    })
}

export function getUserSubscribeApi(openid) {
    return ajax.get(`/compass/api/subscribe/user/${openid}`).then(res=>{
        return res.data;
    })
}