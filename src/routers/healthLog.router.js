import express from "express";

import { getAllHealthLogs, getHealthLog, getHealthLogsByUserId, getHealthLogsByPlantId, createNewHealthLog, deleteHealthLog, updateHealthLog } from '../controllers/healthLog.controller.js';
import { isLoggedIn, isOwner } from "../middleware/index.js";

const router = express.Router();

router.route('/getAllHealthLogs').get(isLoggedIn, getAllHealthLogs);
router.route('/getHealthLog/:id').get(isLoggedIn, isOwner, getHealthLog);
router.route('/getHealthLogsByUserId/:id').get(isLoggedIn, isOwner, getHealthLogsByUserId);
router.route('/getHealthLogsByPlantId/:id').get(isLoggedIn, isOwner, getHealthLogsByPlantId);
router.route('/createNewHealthLog').post(isLoggedIn, createNewHealthLog);
router.route('/deleteHealthLog/:id').delete(isLoggedIn, isOwner, deleteHealthLog);
router.route('/updateHealthLog/:id').patch(isLoggedIn, isOwner, updateHealthLog);

export default router;