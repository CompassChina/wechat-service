import ajax from "../lib/ajax";

export function getAgent() {
    return ajax.get('/compass/api/agents').then(res=>{
        return res.data;
    })
}