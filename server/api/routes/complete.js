import express from 'express';
import * as completeController from '../controllers/complete.js';

const router = express.Router();
router.route('/completecollections')
    .get(completeController.index)
    .post(completeController.save);

// GET by ID, PUT and Complete Routes
router.route('/completecollections/:id')
    .get(completeController.get)
    .put(completeController.update)
    .delete(completeController.remove);

// Exporting the default value
export default router;