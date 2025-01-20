import express from 'express';
import {getAllFood, createFood, getSingleFood, removeFood, editFood, createPlan, deletePlan, getPlans} from '../controllers/controllers.js';
const router = express.Router();
router.use(express.json());

//For food database
router.route('/api').get(getAllFood).post(createFood);
router.route('/api/:id').get(getSingleFood).delete(removeFood).put(editFood);

//For the weekly plan
router.route('/plans').post(createPlan).get(getPlans);
router.route('/plans/:id').delete(deletePlan);

export default router;