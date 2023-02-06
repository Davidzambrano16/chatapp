const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Messages = db.define("messages", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sender_id"
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "conversation_id"
    },
},{
    timestamps: true,
    updatedAt: false,
});

module.exports = Messages;