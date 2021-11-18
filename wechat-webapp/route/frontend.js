const path = require('path');
const fs = require('fs')
const { promisify } = require('util')

const distPath = path.resolve(__dirname, '../../frontend/dist');
const indexPath = path.resolve(distPath, './index.html');

const getResource =  async function(filePath, response) {
    try{
        const targetPath = path.resolve(distPath, `./${filePath}`);
        const stat = await promisify(fs.stat)(targetPath);
        const content =  await promisify(fs.readFile)(targetPath,'utf-8');
        setContentType(filePath, response);
        return content;
    }catch(err){
        const content = await promisify(fs.readFile)(indexPath,'utf-8');
        setContentType(indexPath, response);
        return content;
    }
}

const setContentType = function(filePath,response) {
    if(/.+(\.html)$/.test(filePath)){
        response.set('Content-Type', 'text/html')
    }else if(/.+(\.css)$/.test(filePath)){
        response.set('Content-Type', 'text/css')
    }else if(/.+(\.js)$/.test(filePath)){
        response.set('Content-Type', 'application/javascript')
    }
}

const frontend = {
    path: /\/m\/.+/,
    method: 'get',
    func: async function(request, response) {
        const filePath = request.path.match(/\/m\/(.+)/)[1];
        if(filePath){
            const content = await getResource(filePath, response);
            response.send(content);
        }
    }
}

module.exports.routes = [
    frontend
]