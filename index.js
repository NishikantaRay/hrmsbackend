

import dotenv from 'dotenv';
dotenv.config({path : ".env"});;

import cors from 'cors';
import express from 'express';
import database from './Config/database.js';
import userRoutes from './Routes/user.routes.js';

// import {
//   appErrorHandler,
//   genericErrorHandler,
//   notFound
// } from './middlewares/error.middleware';



// import Endpoints from './models/endpoints.model';

// const listEndpoints = require('express-list-endpoints')

const app = express();

const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/v1/user', userRoutes);

database();



app.listen(port, () => {
  console.log(`Server running bro!`);
});

export default app;
