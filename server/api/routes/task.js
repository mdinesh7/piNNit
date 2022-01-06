import express from 'express';
import * as taskController from '../controllers/task.js';

const router = express.Router();
router.route('/taskcollections')
    .get(taskController.index)
    .post(taskController.save);

// GET by ID, PUT and Delete Routes
router.route('/taskcollections/:id')
    .get(taskController.get)
    .put(taskController.update)
    .delete(taskController.remove);

// Exporting the default value
export default router;