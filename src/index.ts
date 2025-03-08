import express from "express";
import pg from "pg";

import DEMO_PRODUCTS  from "./data/products.json";
import DEMO_CATEGORIES from "./data/categories.json";
import apiRouter from "./routes/apiRoutes";
import adminRouter from "./routes/adminRoutes";
import userRouter from "./routes/userRoutes";


const PORT = 8080;
const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use("/", express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", userRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);


app.listen(PORT, async () => {
    console.log("Listening on port", PORT);
});