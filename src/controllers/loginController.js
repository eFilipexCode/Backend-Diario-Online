const connection = require('../database/connection.js');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
    async signin(req, res) {
        const {email, password} = req.body;
        const user = await connection('users')
            .where('email', email).first();

        if (user) {
            const passwordCheck = bcrypt.compareSync(password, user.password);
            if (!passwordCheck || user.email !== email) {
                res.status(401).json("Well, something went wrong...");
            } else if (passwordCheck && user.email === email) {
                res.status(200).json({user});
            };
        } else if (!user) {
            res.status(400).json({message: "usuário não existe"})
        }
    },
}