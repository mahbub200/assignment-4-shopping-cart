// cart.js

let cart = [];

// Add product to cart
const addToCart = (product, quantity) => {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
};

// Remove product from cart
const removeFromCart = (productId) => {
  cart = cart.filter((item) => item.product.id !== productId);
};

// Clear the cart
const clearCart = () => {
  cart = [];
};

// Get all items in the cart
const getCartItems = () => {
  return cart;
};

// Get the total amount in the cart
const getTotalAmount = () => {
  let total = 0;

  cart.forEach((item) => {
    const { product, quantity } = item;
    const price = applyDiscount(product) || product.price;
    total += price * quantity;
  });

  return total;
};

// Increase quantity of a product in the cart
const increaseQuantity = (productId) => {
  const item = cart.find((item) => item.product.id === productId);

  if (item) {
    item.quantity++;
  }
};

// Decrease quantity of a product in the cart
const decreaseQuantity = (productId) => {
  const item = cart.find((item) => item.product.id === productId);

  if (item && item.quantity > 1) {
    item.quantity--;
  }
};

// Apply discount to a product in the cart
const applyDiscount = (productId, discountPercentage) => {
  const item = cart.find((item) => item.product.id === productId);

  if (item && discountPercentage <= 20) {
    const discount = (item.product.price * discountPercentage) / 100;
    item.product.discountedPrice = item.product.price - discount;
    return item.product.discountedPrice;
  }

  
};

// Remove discount from a product in the cart
const removeDiscount = (productId) => {
  const item = cart.find((item) => item.product.id === productId);

  if (item) {
    delete item.product.discountedPrice;
  }
};




export {
  addToCart,
  removeFromCart,
  clearCart,
  getCartItems,
  getTotalAmount,
  increaseQuantity,
  decreaseQuantity,
  applyDiscount,
  removeDiscount,
};