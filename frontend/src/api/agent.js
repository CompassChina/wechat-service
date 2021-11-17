import ajax from "../lib/ajax";

export function getAgent() {
    return ajax.get('/compass/api/agents').then(res=>{
        return res.data;
    })
}

export function filterAgent({ region, speaking_chinese }) {
    return ajax.post('/compass/api/agents/filter',{ region, speaking_chinese }).then(res=>{
        return res.data;
    })
}