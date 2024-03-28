import express from "express";

import { getAllPlants, getPlant, getPlantsByuserId, createNewPlant, deletePlant, updatePlant } from '../controllers/plant.controller.js';
import { isLoggedIn, isOwner } from "../middleware/index.js";

const router = express.Router();

router.route('/getPlants').get(isLoggedIn, getAllPlants);
router.route('/getPlant/:id').get(isLoggedIn, isOwner, getPlant);
router.route('/getPlantsByUserId/:id').get(isLoggedIn, isOwner, getPlantsByuserId);
router.route('/createNewPlant').post(isLoggedIn, createNewPlant);
router.route('/deletePlant/:id').delete(isLoggedIn, isOwner, deletePlant);
router.route('/updatePlant/:id').patch(isLoggedIn, isOwner, updatePlant);

export default router;