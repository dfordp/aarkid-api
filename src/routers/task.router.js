import express from "express";

import { getAllTasks, getTask, getTasksByUserId, getTasksByPlantId, createNewTask, deleteTask, updateTask } from '../controllers/task.controller.js';
import { isLoggedIn, isOwner } from "../middleware/index.js";

const router = express.Router();

router.route('/getTasks').get(isLoggedIn, getAllTasks);
router.route('/getTask/:id').get(isLoggedIn, isOwner, getTask);
router.route('/getTasksByUserId/:id').get(isLoggedIn, isOwner, getTasksByUserId);
router.route('/getTasksByPlantId/:id').get(isLoggedIn, isOwner, getTasksByPlantId);
router.route('/createNewTask').post(isLoggedIn, createNewTask);
router.route('/deleteTask/:id').delete(isLoggedIn, isOwner, deleteTask);
router.route('/updateTask/:id').patch(isLoggedIn, isOwner, updateTask);

export default router;