const axios = require('axios');
const userModel = require('../models/userModel');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const usuarioLogado = await userModel.findById(user);

        /*faz 3 filtros. Vai buscar: 
        O usuario que NÃO ta logado, o usuario que o logado ja DEU LIKE e DISLIKE */
        const users = await userModel.find({
            //'$' diz que vou aplicar um filtro em todas as minhas condições. ne: NOT EQUAL
            $and: [
                //pega os ID onde ele não seja igual ($ne) ao meu usuario logado
                { _id: { $ne: user } },
                //pega os ID onde ele não esteja dentro($nin) de uma lista, que seria meu like/dislike
                { _id: { $nin: usuarioLogado.likes } },
                { _id: { $nin: usuarioLogado.dislikes } },
            ],
        });

        return res.json(users);
    },



    async store(req, res) {

        const { username } = req.body;

        const userExists = await userModel.findOne({ user: username });
        if (userExists) {
            //se encontrar o usuario que ja existe, ele vai retornar o usuario que existe
            return res.json(userExists);
        }


        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;
        //AXIOS sempre vai retornar meus dados dentro de .DATA

        const user = await userModel.create({
            name,
            user: username,
            bio,
            avatar
        });

        console.log(user);
        return res.json(user);


    }
}