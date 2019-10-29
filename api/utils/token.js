/**
 * Created by XR <xr@bnqkl.cn> on 2017/5/11.
 * By default the algorithm to encode is HS256.
 * The supported algorithms for encoding and decoding are HS256, HS384, HS512 and RS256.
 */

const jwt = require('jwt-simple');
const moment = require('moment');
const debug = require('debug')('ms-framework:token');

const secret = 'AlreadyButNotYetBalabala';
const ONE_WEEK = 7;

/**
 * expose object
 */
var token = module.exports;

/**
 *
 * @param data
 * @param opts
 * @returns {*}
 */
token.encode = function (data, opts) {
    try {
        let d = (opts && opts.expires) || ONE_WEEK;
        let expires = moment().add(d, 'days').valueOf();//授权过期时间
        let token = jwt.encode({
            data: JSON.stringify(data),
            exp: expires
        }, secret);

        debug(`Token编码结果: ${token}`);
        return token;
    } catch (e) {
        debug(`Token编码时出错, data: ${data}, 错误信息：${e.message}`);
        return '';
    }

};

/**
 *
 * @param token
 * @returns {Object}
 */
token.decode = function (token) {
    try {
        let payload = jwt.decode(token, secret);
        debug(`Token解码结果: ${JSON.stringify(payload)}`);
        // FIXME: use vsession's expiration
        // if (new Date(payload.exp) < new Date()) {
        //     throw new Error('Expired');
        // }
        payload.data = JSON.parse(payload.data);
        //TODO: check expiration
        return payload;
    } catch (e) {
        debug(`Token解码时出错, token:${token}, 错误信息：${e.message}`);
        return;
    }

};


