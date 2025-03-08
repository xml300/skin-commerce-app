import express from "express";
import DEMO_PRODUCTS  from "@/data/products.json";
import DEMO_CATEGORIES from "@/data/categories.json";


const apiRouter = express.Router();


apiRouter.get("/products", (req, res) => {
    let products = DEMO_PRODUCTS.map(product => ({...product, category_name: DEMO_CATEGORIES.find(category => category.category_id === product.category_id)?.category_name}));
    const categoryFilter = req.query.category?.toString();


    if (categoryFilter) {
        const lowerCaseCategory = categoryFilter.toLowerCase(); // Ensure case-insensitive matching
        products = products.filter(product =>
            product.category_name?.toLowerCase() === lowerCaseCategory
        );
    }

    res.json(products);
});

apiRouter.get("/products/:productID", (req, res) => {
    const productID = parseInt(req.params.productID);
    const product = DEMO_PRODUCTS.find(product => product.product_id === productID);
    res.json(product);
});

apiRouter.get("/categories", (req, res) => {
    const categories = DEMO_CATEGORIES;
    res.json(categories);
});

apiRouter.post("/admin/products", (req, res) => {
    const {product_name, description, price, category_id, product_images} = req.body;
    res.status(200).json({});
    return;
});

export default apiRouter;