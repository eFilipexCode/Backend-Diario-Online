const connection = require('../database/connection.js');

module.exports = {
    async getUserPosts(req, res) {
        const { authorization } = req.headers;
        
        const response = await connection('posts')
            .select('*')
            .where('user_id', authorization)
        res.json(response);
    },
    async getUniquePost(req, res) {
        const { authorization } = req.headers;
        const postId = req.params.id;

        const response = await connection('posts')
            .select('*')
            .where('id', postId)
            .first();
        res.json(response);
    },
    async getUserData(req, res) {
        const id = req.params.id;

        const response = await connection('users')
            .select('email', 'name', 'profile_image_index')
            .where('id', id);
        const totalPosts = await connection('posts')
            .select()
            .count('*')
            .where('user_id', id)
            .first();
        const totalPublicPosts = await connection('posts')
            .select()
            .count('*')
            .where('user_id', id)
            .andWhere('public', 1)
            .first();
        res.json({data: response, total: totalPosts['count(*)'], publicTotal: totalPublicPosts['count(*)']}); //count(*) is returned in a JSON
    },
    async setUserProfilePicture(req, res ){
        const { authorization } = req.headers;
        const response = await connection('users')
            .update({profile_image_index: req.body.imageIndex})
            .where('id', authorization);

        res.json(response);
    }
}