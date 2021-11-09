const http = require('http');
const path = require('path');
const fs = require('fs');

const isFile = (path) => fs.lstatSync(path).isFile();


const server = async () => http.createServer((req, res) => {
    let url = req.url;
    const indexPath = path.join(process.cwd(), req.url);

    if(!fs.existsSync(indexPath)) {
        return res.end('Файл не найден')
    }
    if(isFile(indexPath)) {
        return fs.createReadStream(indexPath).pipe(res)
    }

    let links = '';
    const params = req.url.match(/[\d\w\.-]+/gi);
    if(params) {
        params.pop();
        const prevUrl = params.join('/');
        if (url.length) {
            links = `<a href="/${prevUrl}"><button type="button" class="btn btn-danger">назад</button></a></li>`
        }
    }

    fs.readdirSync(indexPath).forEach((fileName) => {
        let pathFile = path.join(req.url, fileName);
        links += ` <a href="${pathFile}" class="list-group-item list-group-item-action">${fileName}</a>`
    })

    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('##links', links);
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    return res.end(html);
}).listen(5000);

server().then(r => {});


