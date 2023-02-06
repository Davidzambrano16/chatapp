const { ConversationsServices } = require("../services");

const getConversations = async (req, res, next) => {
    try {
        const { id } = req.params;
        const offset = req.query.offset ?? 0;
        const limit = req.query.limit ?? 3;
        const conversations = await ConversationsServices.getByUser(id, offset, limit);
        res.json(conversations)
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "",
        })
    }
}

const getMessages = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const offset = req.query.offset ?? 0;
        const limit = req.query.limit ?? 20;
        const conversationData = await ConversationsServices.getWithMessages(conversationId, offset, limit);
        res.json(conversationData);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "no existe la conversacion"
        })
    }
}

const createMessageInConversation = async (req, res, next) => {
    try {
        const {conversationId} = req.params;
        const data = req.body; //senderId, message;
        const result = await ConversationsServices.createMessage({...data,conversationId});
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "",
        })
    }
}

const createConversation = async (req, res, next) => {
    try {
        // ´{createdBy: 1, title: "asad", participants: [1,3]}
        const data = req.body;
        const result = await ConversationsServices.create(data);
        res.json(result);
    } catch (error) {
        next({
            status: 400,
            errorContent: error,
            message: "",
        })
    }
}

module.exports = {
    getConversations,
    getMessages,
    createMessageInConversation,
    createConversation,
}