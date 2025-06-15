const express = require("express");
const AuthenticateUser = require("../Auth/Userauth");
const Conversation = require("../Model/conversationModel");
const Message = require("../Model/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");
const router = express.Router();

router.post("/send/:id", AuthenticateUser, async (req, res) => {
  const senderId = req.id;
  const receiverId = req.params.id;
  const { message } = req.body;

  try {
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await Promise.all([gotConversation.save(), newMessage.save()]);

    const senderSocketId = getReceiverSocketId(senderId);
    const receiverSocketId = getReceiverSocketId(receiverId);
    console.log("receiverSocketId:", receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Emitted to receiver:", newMessage);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
      console.log("Emitted to sender:", newMessage);
    }

    return res.status(200).json({ newMessage });
  } catch (error) {
    console.error(error);
  }
});

router.get("/get/:id", AuthenticateUser, async (req, res) => {
  const senderId = req.id;
  const receiverId = req.params.id;
  try {
    const coversations = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    res.status(200).send(coversations?.messages);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
