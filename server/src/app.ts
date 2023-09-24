import express, { Express } from "express";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app: Express = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = 4000
app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
});
