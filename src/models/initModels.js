const  { Users, Conversations, Messages} = require("./index");

//barrels

const initModels = () => {

//muchos a muchos usuarios a conversaciones
//falto la superposicion de muchos a muchos
    Users.belongsToMany(Conversations, {through: "participants" });
    Conversations.belongsToMany(Users, {through: "participants"});

    //uno a muchos usuarios con mensajes
    Messages.belongsTo(Users, {as: "sender", foreignKey: "sender_id"});
    Users.hasMany(Messages, {as: "message", foreignKey: "sender_id"});

    //1 a muchos mensajes conversaciones mensajes
    Messages.belongsTo(Conversations, {as: "chat", foreignKey: "conversation_id"});
    Conversations.hasMany(Messages, {as: "messages", foreignKey: "conversation_id"});

    // 1 a muchos usuarios tiene muchas conversaciones
    Conversations.belongsTo(Users, {as: "owner", foreignKey: "created_by"});
    Users.hasMany(Conversations, {as: "chats", foreignKey: "created_by"});
}

module.exports = initModels;