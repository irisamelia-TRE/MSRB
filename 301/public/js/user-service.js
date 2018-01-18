const request = require('request');

var test = false;

const getUsers = function(req, res) {
    request('https://swift-kaizen.massopen.cloud/swift/v1/mongo/data.json',
        { json: true },
        function (err, $res) {
        if (err || test) {
            console.log(err);
            res.sendStatus(500);
        }
        res.json($res.body)
    });
};

const getUserBySSN = function(req, res) {
    const ssn = req.params.SSN;
    request('https://swift-kaizen.massopen.cloud/swift/v1/mongo/data.json',
        { json: true },
        function (err, $res) {
        if (err || test) {
            console.log(err);
            res.sendStatus(500);
        }
        const users = $res.body;
        const user = users.filter(function (user) {
            return user.ssn.replace(/-/g, "") == ssn;
        });
        res.json(user[0]);
    });
};

const setTest = function(flag) {
    test = flag;
};

const api = {
    getUsers: getUsers,
    getUserBySSN: getUserBySSN,
    setTest: setTest
};

module.exports = api;
