// app.js

import products from "./product.js";
import {
  addToCart,
  removeFromCart,
  clearCart,
  getCartItems,
  getTotalAmount,
  increaseQuantity,
  decreaseQuantity,
  applyDiscount,
  removeDiscount,
} from "./cart.js";

document.addEventListener("DOMContentLoaded", displayProductList);
document
  .getElementById("clear-cart")
  .addEventListener("click", handleClearCart);

function displayProductList() {
  const productListDiv = document.getElementById("product-list");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "card mb-2";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.className = "product-image";
    productImage.width=200;

    const productName = document.createElement("h5");
    productName.className = "card-title";
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.className = "card-text";
    productPrice.textContent = `$${product.price}`;
    

    const addToCartButton = document.createElement("button");
    addToCartButton.className = "btn btn-primary";
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener("click", () => handleAddToCart(product));

    cardBody.appendChild(productImage);
    cardBody.appendChild(productName);
    cardBody.appendChild(productPrice);
   

    cardBody.appendChild(addToCartButton);

    productCard.appendChild(cardBody);
    productListDiv.appendChild(productCard);
  });
}

function handleAddToCart(product) {
  const quantity = 1; // You can implement quantity selection logic if needed
  addToCart(product, quantity);
  displayCartItems();
}

function handleClearCart() {
  clearCart();
  displayCartItems();
}

function handleIncreaseQuantity(productId) {
  increaseQuantity(productId);
  displayCartItems();
}

function handleDecreaseQuantity(productId) {
  decreaseQuantity(productId);
  displayCartItems();
}

function handleDiscount(productId, discountPercentage) {
  applyDiscount(productId, discountPercentage);
  displayCartItems();
}

function handleRemoveDiscount(productId) {
  removeDiscount(productId);
  displayCartItems();
}


function handleRemoveFromCart(productId) {
  removeFromCart(productId);
  displayCartItems();
}

function displayCartItems() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  const cartItems = getCartItems();
  const totalAmount = getTotalAmount();

  if (cartItems.length === 0) {
    cartDiv.textContent = "No items in the cart.";
  } else {
    cartItems.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.className = "card mb-2";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";


      const productImage = document.createElement("img");
      productImage.className = "product-image";
      productImage.src = item.product.image;
      productImage.alt = item.product.name;
      productImage.width=400;

      const productName = document.createElement("h5");
      productName.className = "card-title";
      productName.textContent = item.product.name;

      const productQuantity = document.createElement("p");
      productQuantity.className = "card-text";
      productQuantity.textContent = `Quantity: ${item.quantity}`;

      const productPrice = document.createElement("p");
      productPrice.className = "card-text";
      productPrice.textContent = `Price: $${item.product.price}`;

      const removeButton = document.createElement("button");
      removeButton.className = "btn btn-danger";
      removeButton.textContent = "Remove from Cart";
      removeButton.addEventListener("click", () =>
        handleRemoveFromCart(item.product.id)
      );

      

      const quantityControlDiv = document.createElement("div");
      quantityControlDiv.className = "quantity-control";

      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.addEventListener("click", () =>
        handleDecreaseQuantity(item.product.id)
      );

      const quantityDisplay = document.createElement("span");
      quantityDisplay.textContent = item.quantity;

      const increaseButton = document.createElement("button");
      increaseButton.textContent = "+";
      increaseButton.addEventListener("click", () =>
        handleIncreaseQuantity(item.product.id)
      );

      quantityControlDiv.appendChild(decreaseButton);
      quantityControlDiv.appendChild(quantityDisplay);
      quantityControlDiv.appendChild(increaseButton);

      const discountForm = document.createElement("form");
      discountForm.className = "discount-form";

      const discountInput = document.createElement("input");
      discountInput.type = "number";
      discountInput.min = 0;
      discountInput.max = 100;
      discountInput.placeholder = "Discount %";
      discountInput.addEventListener("input", () =>
        handleDiscount(item.product.id, discountInput.value)
      );

      const removeDiscountButton = document.createElement("button");
      removeDiscountButton.className = "btn btn-warning";
      removeDiscountButton.textContent = "Remove Discount";
      removeDiscountButton.addEventListener("click", () =>
        handleRemoveDiscount(item.product.id)
      );

   

      discountForm.appendChild(discountInput);
      discountForm.appendChild(removeDiscountButton);

      
      cardBody.appendChild(productImage);
      cardBody.appendChild(productName);
      cardBody.appendChild(productQuantity);
      cardBody.appendChild(productPrice);
      cardBody.appendChild(quantityControlDiv);
      cardBody.appendChild(discountForm);
      cardBody.appendChild(removeButton);
      

      // cardBody.appendChild(removItem);

      cartItemDiv.appendChild(cardBody);
      cartDiv.appendChild(cartItemDiv);
    });

    const totalDiv = document.createElement("div");
    totalDiv.className = "mt-3";
    totalDiv.textContent = `Total: $${totalAmount}`;

    cartDiv.appendChild(totalDiv);
  }
}
