import express from "express";
import {writeFileSync} from "fs";

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
    const productData = {
        product_id: DEMO_PRODUCTS.length + 1,
        "product_name": product_name,
        "description": description,
        "ingredients": [
          "Water",
          "Hyaluronic Acid",
          "Glycerin",
          "Propanediol",
          "Sodium Hyaluronate",
          "Panthenol (Vitamin B5)",
          "Ceramides",
          "Phenoxyethanol",
          "Ethylhexylglycerin"
        ],
        "skin_types": ["dry", "combination", "sensitive", "normal"],
        "skin_concerns": ["dryness", "fine lines", "dehydration", "aging"],
        "brand_id": 1,
        "category_id": parseInt(category_id),
        "price": price,
        "stock_quantity": 150,
        "product_images": product_images,
        "product_videos": [],
        "rating_average": 4.7,
        "review_count": 75,
        "created_at": new Date().toDateString(),
        "updated_at": new Date().toDateString()
    };
    const newProducts = [...DEMO_PRODUCTS, productData];
    writeFileSync("src/data/products.json", JSON.stringify(newProducts));
    console.log(newProducts);

    res.status(200).json({});
    return;
});

apiRouter.delete("/admin/products/:productID", (req, res) => {
    const productID = parseInt(req.params.productID);
    const newProducts = DEMO_PRODUCTS.filter(product => product.product_id != productID);

    writeFileSync("src/data/products.json", JSON.stringify(newProducts));
    res.status(200).json({});
    return;
});

apiRouter.put("/admin/products/:productId", (req, res) => {
    const productIdToEdit = parseInt(req.params.productId);
    const { product_name, description, price, category_id} = req.body;
    const product_images = req.body["image-upload"];


    if (!product_name || !description || !price || !category_id || !product_images) {
        res.status(400).json({ error: "Missing required product data for update." });
        return;
    }

    let products = DEMO_PRODUCTS;
    const productIndex = products.findIndex(product => product.product_id === productIdToEdit);

    if (productIndex === -1) {
        res.status(404).json({ error: "Product not found for editing." });
        return;
    }

    // Update the product data
    products[productIndex] = {
        ...products[productIndex], // Keep existing properties and overwrite/add new ones
        product_name,
        description,
        price: parseFloat(price),
        category_id: parseInt(category_id),
        product_images: [product_images], // Assuming single image URL, adjust if needed
        // ... (Update other editable fields as needed from req.body)
    };

    writeFileSync("src/data/products.json", JSON.stringify(products));

    res.status(200).json({ message: `Product with ID ${productIdToEdit} updated successfully.`, updatedProduct: products[productIndex] });
});

export default apiRouter;