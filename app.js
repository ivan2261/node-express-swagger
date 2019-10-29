'use strict';

var debug = require('debug')('sample-api:app');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var cors = require('cors');
var path = require('path');

module.exports = app; // for testing

var config = {
    appRoot: __dirname // required config
};

/**
 * support CORS
 */
app.use(cors());


//初始化字典文件
var dictFile = path.join(__dirname, './config/dict.json');
debug(`loading ${dictFile}`);

var dict = require('./api/utils/dict');
dict.init(dictFile);


SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) { throw err; }

    // enable SwaggerUI
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 10010;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://localhost:' + port + '/hello?name=Scott');
        console.log('Swagger-ui is available on http://localhost:%d/docs', port);
    }
});
