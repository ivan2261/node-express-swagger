/**
 * Created by XR <xr@bnqkl.cn> on 2017/5/11.
 */

var crypto = require('crypto');

var Common = {};

Common.hash = function (str) {
    var shasum = crypto.createHash("md5");

    shasum.update(str);
    var ret = shasum.digest("hex");

    return ret;
};

/**
 * Helper function for creating a method on a prototype.
 *
 * @param {Object} obj
 * @param {String} name
 * @param {Function} fn
 * @private
 */
Common.defineMethod = function (obj, name, fn) {
    Object.defineProperty(obj, name, {
        configurable: true,
        enumerable: false,
        value: fn,
        writable: true
    });
};

module.exports = Common;

