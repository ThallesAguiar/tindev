const userModel= require('../models/userModel');

module.exports = {
    async store(req, res){
        console.log(req.params.userId);
        console.log(req.headers.user);

        const {userId} = req.params;
        const {user} = req.headers;

        const usuarioLogado = await userModel.findById(user);
        const usuarioAlvo = await userModel.findById(userId); //recebe like/deslike

        if (!usuarioAlvo) {
            return res.status(400).json({error: 'Usuario não existe!'});
        }

        usuarioLogado.dislikes.push(usuarioAlvo._id);

        await usuarioLogado.save();

        return res.json(usuarioLogado);
    }
}