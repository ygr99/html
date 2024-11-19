const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname);

// 获取当前目录下的所有 HTML 文件及其修改时间
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  // 过滤出 HTML 文件，排除 index.html
  const htmlFiles = files.filter(
    (file) =>
      path.extname(file).toLowerCase() === ".html" && file !== "index.html"
  );

  // 获取每个 HTML 文件的修改时间
  const fileStats = htmlFiles.map((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);
    return {
      name: file,
      mtime: stats.mtime,
    };
  });

  // 按照修改时间倒序排列
  fileStats.sort((a, b) => b.mtime - a.mtime);

  // 生成 HTML 内容
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>目录</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }
                .container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 80%;
                    width: 100%;
                }
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                }
                ul {
                    list-style-type: none;
                    padding-left: 20px;
                }
                li {
                    margin: 10px 0;
                    display: flex;
                    align-items: center;
                }
                a {
                    text-decoration: none;
                    color: #333;
                    font-size: 18px;
                    flex-grow: 1;
                }
                a:hover {
                    color: #007bff;
                }
                .file-info {
                    font-size: 14px;
                    color: #777;
                    margin-left: 10px;
                }
                .file-number {
                    font-size: 18px;
                    color: blue;
                    margin-right: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>目录</h1>
                <ul>
                    ${fileStats
                      .map(
                        (file, index) => `
                        <li>
                            <span class="file-number">${
                              fileStats.length - index
                            }</span>
                            <a href="${file.name}">${file.name.replace(
                          ".html",
                          ""
                        )}</a>
                            <span class="file-info">${formatDate(
                              file.mtime
                            )}</span>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
        </body>
        </html>
    `;

  // 写入 index.html 文件
  fs.writeFile(path.join(directoryPath, "index.html"), htmlContent, (err) => {
    if (err) {
      return console.log("Error writing file: " + err);
    }
    console.log("index.html 文件已生成");
  });
});

// 格式化日期
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
