import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sample data
const mockUsers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const mockProducts = [
  { id: 1, name: "Laptop",          price: 999.99, category: "Electronics" },
  { id: 2, name: "Wireless Mouse",  price: 29.99,  category: "Accessories" },
  { id: 3, name: "Mechanical Keyboard", price: 79.99, category: "Accessories" },
  { id: 4, name: "USB-C Hub",       price: 45.00,  category: "Accessories" },
  { id: 5, name: "Gaming Laptop",   price: 1499.99, category: "Electronics" }
];

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: "API is running — welcome!" 
  });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.status(200).json(mockUsers);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID — must be a number" });
  }

  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: `User with ID ${userId} not found` });
  }

  res.status(200).json(user);
});

// Get all products
app.get('/api/products', (req, res) => {
  res.status(200).json(mockProducts);
});

// Get product by ID (already have similar logic for users)
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ error: "Invalid product ID — must be a number" });
  }

  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: `Product with ID ${productId} not found` });
  }

  res.status(200).json(product);
});

// ★ NEW: Get product(s) by name (case-insensitive partial match)
app.get('/api/products/name/:name', (req, res) => {
  const searchName = req.params.name.trim().toLowerCase();

  if (!searchName) {
    return res.status(400).json({ error: "Product name is required" });
  }

  // Find products that contain the search term in their name
  const matchingProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchName)
  );

  if (matchingProducts.length === 0) {
    return res.status(404).json({ 
      message: `No products found matching "${req.params.name}"`,
      searched: req.params.name 
    });
  }

  res.status(200).json({
    count: matchingProducts.length,
    products: matchingProducts
  });
});

// Optional: 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ 
    error: `Route ${req.method} ${req.originalUrl} not found` 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});