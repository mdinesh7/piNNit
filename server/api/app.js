//Importing all the necessary packages

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

mongoose.connect('mongodb://localhost:27017/taskdb', {useNewUrlParser:true, useUnifiedTopology:true}); 

//Using all the packages
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

routes(app);

// Exporting the file to use it in another component
export default app; 