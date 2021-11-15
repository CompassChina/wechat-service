# WeChat Web app

Node express web app, 包括请求微信 api 代码, 模拟 compass api 代码, H5页面及交互代码

## Run app
在 `wechat-webapp` 目录跑 `npm i` 然后 `node app.js`

### 开发概览

下面以 agent查询 为例, 说明各主要文件对应的功能
1. 前端请求 `/compass/agents` 路由, `route/compass.js` 文件决定返回 `template/agents.html`
2. `template/agents.html` 加载前端交互代码 `static/js/agents.js`
3. `static/js/agents.js` 请求了 GET '/compass/api/agents' api, 获得经纪人列表, 并更新到页面中.
4.  `route/agent.js` 实现了 GET '/compass/api/agents'
5. GET '/compass/api/agents' 的 action 调用了 agent model 的 all() 函数获取到列表.
6. `model/agent.js` 实现 agent model, 完成增删查改
