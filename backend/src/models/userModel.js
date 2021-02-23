const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type:Schema.Types.ObjectId,
        ref: 'userModel',
    }],
    dislikes: [{
        type:Schema.Types.ObjectId,
        ref: 'userModel',
    }],

}, {
    timestamps: true //createdAt, updatedAt. Armazena automatico pelo mongoose dt de criação e atualização
});

module.exports = model('User', UserSchema);
            //  função( Nome do model(que vai aparecer no BD), e o Schema)

/**
    email:String,
    senha:String,
    genero:String,
    dtNasc:Date,
    telefone:Number,
    nivelAcesso: Number,
    endereco: String,
    status: Number,
 */