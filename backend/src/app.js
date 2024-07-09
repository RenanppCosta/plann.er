import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes/router.js";

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());


app.use(router);

app.listen(3000, ()=> console.log("Estou rodando na porta 3000"));