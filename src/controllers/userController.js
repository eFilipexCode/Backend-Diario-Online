const connection = require('../database/connection.js');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
    async index(req, res) {
        const response = await connection('users').select('*');
        res.json(response);
    },
    async store(req, res) {
        const { name, username, email } = req.body;
        let { password } = req.body;

        const encryptPassword = password => {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        };

        password = encryptPassword(password);

        const response = await connection('users').insert({
            name,
            username,
            email,
            password
        });

        res.json(response);
    },
};