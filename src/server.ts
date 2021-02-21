import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv"
dotenv.config();

import connectDB from "./helpers/database"
import auth from "./routes/authRoutes";
import user from "./routes/userRoutes";


const app = express();


connectDB();


app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api", auth);
app.use("/api", user);


const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
