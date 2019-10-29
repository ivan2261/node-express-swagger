'use strict';


/**
 * 创建用户
 * 创建一个新的用户
 *
 * body User 
 * returns User
 **/
exports.addUser = function (body) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "password": "password",
            "userStatus": "normal",
            "phone": "phone",
            "id": "id",
            "username": "username"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * 根据id删除用户
 * 删除用户列表的现有用户
 *
 * id String 用户ID
 * no response value expected for this operation
 **/
exports.deleteUser = function (id) {
    return new Promise(function (resolve, reject) {
        resolve();
    });
}


/**
 * 根据状态查找用户
 * 可以用逗号分隔的字符串提供多个状态值
 *
 * status List 进行过滤的状态
 * page Integer 当前页，从1开始，默认：1 (optional)
 * pageSize Integer 页大小，默认：10 (optional)
 * returns Users
 **/
exports.findUsersByStatus = function (status, page, pageSize) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = "";
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * 根据标签查找用户
 * 可以用逗号分隔的字符串提供多个标签值
 *
 * tags List 进行过滤的标签
 * page Integer 当前页，从1开始，默认：1 (optional)
 * pageSize Integer 页大小，默认：10 (optional)
 * returns Users
 **/
exports.findUsersByTags = function (tags, page, pageSize) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = "";
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * 根据id查找用户
 * 返回一个用户
 *
 * id String 用户ID
 * returns User
 **/
exports.getUserById = function (id) {
    return new Promise(function (resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "password": "password",
            "userStatus": "normal",
            "phone": "phone",
            "id": "id",
            "username": "username"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * 更新用户
 * 更新用户列表的现有用户
 *
 * body User 
 * no response value expected for this operation
 **/
exports.updateUser = function (body) {
    return new Promise(function (resolve, reject) {
        resolve();
    });
}


/**
 * 更新用户
 * 用表单数据更新用户
 *
 * id String 用户ID
 * body User The user to update.
 * no response value expected for this operation
 **/
exports.updateUserWithForm = function (id, body) {
    return new Promise(function (resolve, reject) {
        resolve();
    });
}

