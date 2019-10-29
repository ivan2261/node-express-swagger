'use strict';

var CustomError = require('../utils/customError')
var appConfig = require('../../config');
var ws = require('../utils/logger')(appConfig.logConfig);
var User = require('../service/UserService');

module.exports = {
    addUser: addUser,
    deleteUser: deleteUser,
    findUsersByStatus: findUsersByStatus,
    findUsersByTags: findUsersByTags,
    getUserById: getUserById,
    updateUser: updateUser,
    updateUserWithForm: updateUserWithForm
}

/**
 * 新增用户
 * @param {*} req
 * @param {*} res
 */
function addUser(req, res) {
    var body = req.swagger.params['body'].value;
    User.addUser(body)
        .then(function (result) {
            return res.json({ data: result });
        })
        .catch(function (err) {
            ws.log('error', err);
            if (!(err instanceof CustomError)) {
                err = new CustomError(999, err.message);
            }
            return res.status(500).json(err.toJSON());
        });
};

function deleteUser(req, res, next) {
    var id = req.swagger.params['id'].value;
    User.deleteUser(id)
        .then(function (result) {
            return res.json({ data: result });
        })
        .catch(function (err) {
            ws.log('error', err);
            if (!(err instanceof CustomError)) {
                err = new CustomError(999, err.message);
            }
            return res.status(500).json(err.toJSON());
        });
};

function findUsersByStatus(req, res, next) {
    var status = req.swagger.params['status'].value;
    var page = req.swagger.params['page'].value;
    var pageSize = req.swagger.params['pageSize'].value;
    User.findUsersByStatus(status, page, pageSize)
        .then(function (result) {
            return res.json({ data: result });
        })
        .catch(function (err) {
            ws.log('error', err);
            if (!(err instanceof CustomError)) {
                err = new CustomError(999, err.message);
            }
            return res.status(500).json(err.toJSON());
        });
};

function findUsersByTags(req, res, next) {
    var tags = req.swagger.params['tags'].value;
    var page = req.swagger.params['page'].value;
    var pageSize = req.swagger.params['pageSize'].value;
    User.findUsersByTags(tags, page, pageSize)
        .then(function (result) {
            return res.json({ data: result });
        })
        .catch(function (err) {
            ws.log('error', err);
            if (!(err instanceof CustomError)) {
                err = new CustomError(999, err.message);
            }
            return res.status(500).json(err.toJSON());
        });
};

function getUserById(req, res, next) {
    var id = req.swagger.params['id'].value;
    User.getUserById(id)
        .then(function (result) {
            return res.json({ data: result });
        })
        .catch(function (err) {
            ws.log('error', err);
            if (!(err instanceof CustomError)) {
                err = new CustomError(999, err.message);
            }
            return res.status(500).json(err.toJSON());
        });
};

function updateUser(req, res, next) {
    var body = req.swagger.params['body'].value;
    User.updateUser(body)
        .then(function (result) {
            return res.json({ data: result });
        })
        .catch(function (err) {
            ws.log('error', err);
            if (!(err instanceof CustomError)) {
                err = new CustomError(999, err.message);
            }
            return res.status(500).json(err.toJSON());
        });
};

function updateUserWithForm(req, res, next) {
    var id = req.swagger.params['id'].value;
    var body = req.swagger.params['body'].value;
    User.updateUserWithForm(id, body)
        .then(function (result) {
            return res.json({ data: result });
        })
        .catch(function (err) {
            ws.log('error', err);
            if (!(err instanceof CustomError)) {
                err = new CustomError(999, err.message);
            }
            return res.status(500).json(err.toJSON());
        });
};
