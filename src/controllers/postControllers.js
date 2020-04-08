const connection = require('../database/connection.js');

module.exports = {
    async store(req, res) {
        const { title, description, content, public } = req.body;
        const id = req.headers.authorization;

        const response = await connection('posts').insert({
            title,
            description,
            content,
            public,
            user_id: id
        });

        res.json(response);
    },
    async indexPublic(req, res) {
        const { page = 1 } = req.query;
        const response = await connection('posts')
            .limit(10)
            .offset((page - 1) * 10)
            .select('posts.*', 'users.name', 'users.username', 'users.profile_image_index')
            .innerJoin('users', 'users.id', 'user_id')
            .where('public', true)
            .orderBy('posts.id', 'desc')
        res.json(response);
    },
    async remove(req, res) {
        const { postId } = req.params;

        const userIdHeader = req.headers.authorization;
        const userId = await connection('users').select('*').where('id', userIdHeader).first();

        console.log(userIdHeader, userId.id);


        if (userIdHeader != userId.id) {
            res.status(403).json("Exclusão não permitida.");
            return;
        };


        const response = await connection('posts')
            .delete('*')
            .where('id', postId);

        res.status(204).json(response);
    },
    async edit(req, res) {
        const { update, postId} = req.body;

        const { authorization } = req.headers;

        const post = await connection('posts').select('*').where('id', postId).first();

        if (authorization != post.user_id) {
            res.status(401).send("Ei, você não tem permissão para isso!");
            return;
        };

        const response = await connection('posts')
            .select('*')
            .update(update)
            .where('id', postId);
        res.json(response); 
    },
}