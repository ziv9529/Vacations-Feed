import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import { initDB } from "./db";
import authRouter from "./auth";
import vacationsRouter from "./vacations";
import verifyToken from "./middleware/auth";


initDB();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/healthcheck", async (req, res) => {
    return res.send("Api is working!");
});
app.use("/auth", authRouter);
app.use(verifyToken);
app.use("/vacations", vacationsRouter)

app.use((error, req, res, next) => {
    if (error.status)
        return res.status(error.status).json({ message: "something went wrong" });
    return res.status(500).json({ message: "something went wrong" });
});

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`api listening to port ${PORT}`);
});
