const path = require('path');
const koaBody = require('koa-body');

const fileUpLoadConfig = koaBody({
    multipart: true,
    formidable: {
        //配置选项option中，不推荐使用相对路径
        //option 里的相对路径，不是相对当前页面的路径，是相对于process.cwd()static/images/
        uploadDir: path.join(__dirname, '../static/upload'),
        keepExtensions: true,
        onError(err) {
            console.log('图片。。。。。。。', err)
        },
        onFileBegin(name, file) {
            file = null;
            console.log('图片开始。。。。。。。', file)
        },
    }
})
module.exports = {
    fileUpLoadConfig
}