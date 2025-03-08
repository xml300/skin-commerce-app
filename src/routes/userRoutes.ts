import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.render("index.ejs");
});

userRouter.get("/products", (req, res) => {
    res.render("product-list.ejs");
});

userRouter.get("/product/:productId", (req, res) => {
    const productID = req.params.productId;
    res.render("product-details.ejs");
});

userRouter.get("/cart", (req, res) => {
    res.render("cart.ejs");
});

userRouter.get("/checkout", (req, res) => {
    res.render("checkout.ejs");
});

userRouter.get("/order-confirmation", (req, res) => {
    res.render("order-confirm.ejs");
})


export default userRouter;