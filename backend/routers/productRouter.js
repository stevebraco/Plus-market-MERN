import data from "../data.js";
import express from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utlis.js";

const productRouter = express.Router();

//Récupère les documents
productRouter.get(
  "/",
  (async (req, res) => {
    const name = req.query.name || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i' }} : {}; // Search a product
    const products = await Product.find({ ...nameFilter }).sort({ _id: -1 });
    try {
      res.send(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

// Les derniers produits
productRouter.get(
  "/lastproducts",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    try {
      res.send(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

// Les Best Ratings
productRouter.get(
  "/bestseller",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find().sort({ rating: -1 }).limit();
    try {
      res.send(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

//Insert plusieurs documents
productRouter.get("/seed", async (req, res) => {
  // await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  try {
    res.send({ products: createdProducts });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Find categories
productRouter.get("/categories", async (req, res) => {
  const categories = await Product.find().distinct("category");
  try {
    res.send(categories);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//Créer un produit
productRouter.post("/", isAuth, isAdmin, async (req, res) => {
  //isAdmin
  const product = new Product({
    name: "name" + Date.now(),
    image: "./images/product-1.png",
    price: 0,
    countInStock: 0,
    rating: 0,
    category: "fruits",
  });
  const createdProduct = await product.save();
  try {
    res.send({ message: "Product Created", product: createdProduct });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

productRouter.put("/:id", isAuth, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.countInStock = req.body.countInStock;
      product.category = req.body.category;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//delete 
productRouter.delete('/:id', isAuth, isAdmin, async(req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if(product) {
      const deleteProduct = await product.remove();
      res.send({ message : 'Product Deleted', product: deleteProduct })
    } else {
      res.status(404).send({ message: 'Product Not Found' })
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
    
  }
  
})

export default productRouter;
