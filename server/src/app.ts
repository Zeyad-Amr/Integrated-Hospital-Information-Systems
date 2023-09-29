import express, { Express } from "express";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app: Express = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(process.env.PORT || 4000, () => {
    console.log(`listening to ${process.env.PORT || 4000}`);
});
