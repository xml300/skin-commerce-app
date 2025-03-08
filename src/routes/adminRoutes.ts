import express from "express";
import DEMO_CATEGORIES from "@/data/categories.json";

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
    const categories = DEMO_CATEGORIES;
    res.render("admin.ejs", { categories });
});

export default adminRouter