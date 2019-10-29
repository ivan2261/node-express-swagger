const Winston = require('./winston');
const fs = require('fs');
const path = require('path');

module.exports = function (loggerConfig, fileName) {
    let _defaultFile = {
        maxFiles: "14d",
        maxsize: "500m",
        //仅支持app.js启动是配置的路径，此路径在项目根目录下
        filePath: path.join(process.cwd(), "../logs/"),
        serviceName: "picasso-server"
    };

    let opts = loggerConfig || _defaultFile;
    try {
        if (!fs.existsSync(opts.filePath)) {
            fs.mkdirSync(opts.filePath);
        }
    } catch (err) {
        try {
            opts.filePath = _defaultFile.filePath;
            if (!fs.existsSync(opts.filePath)) {
                fs.mkdirSync(opts.filePath);
            }
        } catch (err) {
            opts.filePath = '';
        }
    } finally {
        try {
            if (fileName) {
                var index = fileName.lastIndexOf("/") + 1;
                fileName = "[" + fileName.substring(index) + "]";
                return new Winston(opts, fileName);
            } else {
                return new Winston(opts, "");
            }
        } catch (err) {
            return new Winston(opts, "");
        }
    }
};
