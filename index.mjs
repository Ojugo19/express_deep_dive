import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data (fixed typo)
const mockProducts = [
  { id: 1, name: "Laptop",   price: 999.99 },
  { id: 2, name: "Mouse",    price: 29.99  },
  { id: 3, name: "Keyboard", price: 79.99  }
];

// Recommended: parse JSON bodies (for future POST/PUT routes)
app.use(express.json());

// Root route (just for testing)
app.get('/', (req, res) => {
  res.json({ message: "API is running" });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.status(200).json(mockProducts);
});

// ← FIXED: Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10); // base 10 is good practice

  if (isNaN(productId)) {
    return res.status(400).json({ 
      error: "Invalid product ID - must be a number" 
    });
  }

  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ 
      error: `Product with ID ${productId} not found` 
    });
  }

  res.status(200).json(product);
});

// Optional: catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ 
    error: `Route ${req.method} ${req.originalUrl} not found` 
  });
});

// Start server (only once, at the bottom)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});