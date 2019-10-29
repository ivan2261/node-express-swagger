var util = require('util');
var CustomError = require('../utils/customError');
var ws = require('winston');

module.exports = function create(fittingDef) {

    return function error_handler(context, next) {

        if (!util.isError(context.error) && !(context.error instanceof CustomError)) { return next(); }

        var err = context.error;

        try {
            context.headers['Content-Type'] = 'application/json';

            if (!context.statusCode || context.statusCode < 400) {
                if (context.response && context.response.statusCode && context.response.statusCode >= 400) {
                    context.statusCode = context.response.statusCode;
                } else if (err.statusCode && err.statusCode >= 400) {
                    context.statusCode = err.statusCode;
                    delete (err.statusCode);
                } else {
                    context.statusCode = 500;
                }
            }
            ws.log('error', err);
            let message = '';
            if (err.results && err.results.errors && err.results.errors.length) {
                for (let [index, item] of context.error.results.errors.entries()) {
                    message += `${index}.${item.path}:${item.message};  `;
                }
                err.message = message;
            }

            if (!(err instanceof CustomError)) {
                err = new CustomError('999', err.message);
            }
            var content = JSON.stringify(err.toJSON());
            var l = Buffer.from(content).length;
            context.response.writeHead(context.statusCode, { "Content-Type": "application/json", "Content-Length": l })
            context.response.end(content);

            //next(null, JSON.stringify(err.toJSON()));
        } catch (err2) {
            ws.log('error', err);
            next();
        }
    }
};
