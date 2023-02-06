const {userRegister, getAllUser} = require("./users.controllers");
const {userLogin} = require("./auth.controllers");
const {getConversations} = require("./conversation.controllers");
const {getMessages} = require("./conversation.controllers");
const {createMessageInConversation} = require("./conversation.controllers");
const {createConversation} = require("./conversation.controllers");

module.exports = {
    userRegister,
    getAllUser,
    userLogin,
    getConversations,
    getMessages,
    createMessageInConversation,
    createConversation,
}