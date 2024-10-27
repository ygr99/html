const fs = require('fs');
const path = require('path');

// 获取当前目录下的所有 HTML 文件
const directoryPath = path.join(__dirname);
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    // 过滤出 HTML 文件
    const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html');

    // 生成 HTML 内容
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>目录</title>
            <style>
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin: 10px 0;
                }
                a {
                    text-decoration: none;
                    color: #333;
                    font-size: 18px;
                }
            </style>
        </head>
        <body>
            <h1>目录</h1>
            <ul>
                ${htmlFiles.map(file => `<li><a href="${file}">${file}</a></li>`).join('')}
            </ul>
        </body>
        </html>
    `;

    // 写入 index.html 文件
    fs.writeFile('目录.html', htmlContent, (err) => {
        if (err) {
            return console.log('Error writing file: ' + err);
        }
        console.log('目录.html 文件已生成');
    });
});