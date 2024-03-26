import express from "express";

import { getAllMessages, getMessage, getMessagesByUserId, createNewMessage, deleteMessage, updateMessage } from '../controllers/message.controller.js';
import { isLoggedIn, isOwner } from "../middleware/index.js";

const router = express.Router();

router.route('/getMessages').get(isLoggedIn, getAllMessages);
router.route('/getMessage/:id').get(isLoggedIn, isOwner, getMessage);
router.route('/getMessagesByUserId/:id').get(isLoggedIn, isOwner, getMessagesByUserId);
router.route('/createNewMessage').post(isLoggedIn, createNewMessage);
router.route('/deleteMessage/:id').delete(isLoggedIn, isOwner, deleteMessage);
router.route('/updateMessage/:id').patch(isLoggedIn, isOwner, updateMessage);

export default router;