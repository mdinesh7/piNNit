// Importing task, archive and trash files to index file

import taskRouter from './task.js';
import trashRouter from './trash.js';
import archiveRouter from './archive.js';
import completeRouter from './complete.js';

export default (app) => {
    /* Task Router */
    app.use('/', taskRouter);
    app.use('/', trashRouter);
    app.use('/', archiveRouter);
    app.use('/', completeRouter);
};

