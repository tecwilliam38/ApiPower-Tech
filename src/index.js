import express from "express";
import cors from "cors";
import router from "./routes.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());

app.use(cors());
app.use(router);
app.use(bodyParser.json());



app.listen(3001, () => {
    console.log("Servidor rodando na porta: 3001");
});