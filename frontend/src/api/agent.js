import ajax from "../lib/ajax";

export function getAgentApi() {
    return ajax.get('/compass/api/agents').then(res=>{
        return res.data;
    })
}

export function getAgentByIdApi(id) {
    return ajax.get(`/compass/api/agent/${id}`).then(res=>{
        return res.data;
    })
}


export function filterAgentApi({ region, speaking_chinese }) {
    return ajax.post('/compass/api/agents/filter',{ region, speaking_chinese }).then(res=>{
        return res.data;
    })
}