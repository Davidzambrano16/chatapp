const { Users, Participants, Conversations, Messages } = require("../models");

class ConversationsServices {
    static async getByUser(id, offset, limit) {
        try {
            const conversations = await Users.findAll({
                where: { id },
                attributes: ["id", "firstname", "lastname"],
                include: {
                    model: Conversations,
                    attributes: ["id", "title", "imageUrl"],
                },
                // no puedo agg el offset y el limit dentro del include por que me dara error, debo agg la propiedad subquery
                offset,
                limit,
                subQuery: false,
            });
            return conversations;
        } catch (error) {
            throw error;
        }
    }

    static async getWithMessages(id, offset, limit) {
        try {
            const result = await Conversations.findAndCountAll({
                where: { id },
                attributes: ["title", "imageUrl"],
                include: [
                    {
                        model: Messages,
                        required:true,
                        as: "messages",
                        attributes: ["senderId", "message"],
                    },
                    {
                        model: Users,
                        attributes: ["id", "firstname", "lastname"],
                    }
                ],
                offset,
                limit,
                subQuery: false
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async createMessage(data) {
        try {
            const result = await Messages.create(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async create(data) {
        try {
            const { createdBy, title, participants } = data;
            const conversation = await Conversations.create({ title, createdBy });
            const conversationId = conversation.id;
            //participants = [1,2]
            //Participanst = [{conversationId, senderId}, {conversationId, senderId}];
            const conversationParticipants = participants.map((userId) => {
                return { conversationId, userId };
            });
            conversationParticipants.forEach(async participant => await Participants.create(participant));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ConversationsServices;
















