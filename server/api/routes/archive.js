import express from 'express';
import * as archiveController from '../controllers/archive.js';

const router = express.Router();
router.route('/archivecollections')
    .get(archiveController.index)
    .post(archiveController.save);

// GET by ID, PUT and Archive Routes
router.route('/archivecollections/:id')
    .get(archiveController.get)
    .put(archiveController.update)
    .delete(archiveController.remove);

// Exporting the default value
export default router;