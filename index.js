import { dbConnection } from "./DataBase/db_connection.js";
import express from 'express';
import {} from 'dotenv/config.js';
import cors from 'cors';
import { RouterPage } from "./Routers/RouterPage.js";

dbConnection();

const app = express();

app.use(cors({origin:'*'}));
app.use(express.json());

app.use('/',RouterPage)

app.listen(process.env.PORT,()=>console.log("Server connected"))