const userModel= require('../models/userModel');

module.exports = {
    async store(req, res){
        console.log(req.io, req.connectedUsers);

        const {userId} = req.params;
        const {user} = req.headers;

        const usuarioLogado = await userModel.findById(user);
        const usuarioAlvo = await userModel.findById(userId); //recebe like/deslike

        if (!usuarioAlvo) {
            return res.status(400).json({error: 'Usuario não existe!'});
        }
        if (usuarioAlvo.likes.includes(usuarioLogado._id)) {
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[userId];

            if(loggedSocket) {
                req.io.to(loggedSocket).emit('match', usuarioAlvo);
            }

            if(targetSocket) { 
                req.io.to(targetSocket).emit('match', usuarioLogado);
            }
            
        }

        usuarioLogado.likes.push(usuarioAlvo._id);

        await usuarioLogado.save();

        return res.json(usuarioLogado);
    }
}