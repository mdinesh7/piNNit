import express from 'express';
import * as trashController from '../controllers/trash.js';

const router = express.Router();
router.route('/trashcollections')
    .get(trashController.index)
    .post(trashController.save);

// GET by ID, PUT and Delete Reoutes
router.route('/trashcollections/:id')
    .get(trashController.get)
    .put(trashController.update)
    .delete(trashController.remove);

// Exporting the default value
export default router;