const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
  secret: 'cart-secret',
  resave: false,
  saveUninitialized: false
}));

// Initialize cart middleware
const initCart = (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
};

app.use(initCart);

// Add item to cart
app.post('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.body;

  if (!productId || !name || price == null) {
    return res.status(400).json({ message: 'productId, name and price are required' });
  }

  const qty = quantity && quantity > 0 ? quantity : 1;

  const existingItem = req.session.cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    req.session.cart.push({
      productId,
      name,
      price,
      quantity: qty
    });
  }

  res.status(201).json({
    message: 'Item added to cart',
    cart: req.session.cart
  });
});

// Update item quantity
app.put('/cart/update/:productId', (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const item = req.session.cart.find(item => item.productId === productId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  item.quantity = quantity;

  res.json({
    message: 'Cart updated successfully',
    cart: req.session.cart
  });
});

// Remove item from cart
app.delete('/cart/remove/:productId', (req, res) => {
  const { productId } = req.params;

  const index = req.session.cart.findIndex(item => item.productId === productId);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  req.session.cart.splice(index, 1);

  res.json({
    message: 'Item removed from cart',
    cart: req.session.cart
  });
});

// View cart
app.get('/cart', (req, res) => {
  const totalPrice = req.session.cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  res.json({
    cart: req.session.cart,
    totalPrice
  });
});

// Clear cart
app.delete('/cart/clear', (req, res) => {
  req.session.cart = [];
  res.json({ message: 'Cart cleared successfully' });
});

app.listen(3001, () => {
  console.log('Server running on port 3000');
});