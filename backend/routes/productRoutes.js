const express = require('express');
const { authenticateToken } = require('../middleware/jwt');  // Import JWT middleware for authentication
const Product = require('../models/Product');  // Import the product model
const router = express.Router();

// GET products - List all products
router.get('/getall', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Fetching Data .....")
    console.log(products);  // This line logs the fetched products to the console
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch products", error });
  }
});

// POST product - Add a new product
// Server side implementation for adding a product
// Server side implementation for adding a product
// Server side implementation for adding a product
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product();  // Ensuring this aligns with the mocked constructor behavior
    product.name = name;
    product.price = price;
    product.description = description;
    const savedProduct = await product.save();

    if (!savedProduct) {
      throw new Error('Product not saved');
    }

    console.log("New product added:", savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Failed to create product:", error);
    res.status(400).json({ message: "Failed to create product", error: error.toString() });
  }
});








// PUT product - Update a product
router.put('/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, description } = req.body;
    const product = await Product.findByIdAndUpdate(productId, { name, price, description }, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    console.log("Updating .....")
    console.log("Product updated:", product);  // Logs the updated product
    res.send(product);
  } catch (error) {
    res.status(400).send({ message: "Failed to update product", error });
  }
});

// DELETE product - Delete a product
router.delete('/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    console.log("Deleting .....")
    console.log("Product deleted:", productId);  // Logs the ID of the deleted product
    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete product", error });
  }
});

module.exports = router;
