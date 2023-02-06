const { Router } = require("express");
const { getConversations,
        getMessages, createMessageInConversation,
        createConversation,        
} = require("../controllers");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();
//obtiene todas las conversaciones de un usuario
//necesitaremos agregar
/**
 * @openapi
 * /api/v1/conversations/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all conversations from user
 *     tags: [conversations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: user Id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items: {}
 * /api/v1/conversations/messages/{conversationId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener todos los mensajes de una conversación
 *     tags: [conversations]
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: El id de la conversación donde obtendremos los mensajes
 */
router.get("/conversations/:id", authenticate, getConversations);
router.get("/conversations/:conversationId/messages", getMessages);

router.post("/conversations/:conversationId/message", authenticate, createMessageInConversation);

router.post("/conversations", authenticate, createConversation);

module.exports = router;