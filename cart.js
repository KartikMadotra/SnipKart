let cart = [];

function addToCart(product) {
  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    // If the product already exists, update its quantity
    existingProduct.quantity++;
  } else {
    // If the product doesn't exist, add it to the cart with a quantity of 1
    cart.push({ ...product, quantity: 1 });
  }

  // Update the cart display
  updateCartDisplay();
}

function checkout() {
  // Perform the checkout process
  // You can implement the logic to process the checkout here

  // Clear the cart after checkout
  cart = [];

  // Update the cart display
  updateCartDisplay();
}

function closeCart() {
  // Hide the cart
  const cartElement = document.getElementById('cart');
  cartElement.style.display = 'none';
}

function updateCartDisplay() {
  const cartElement = document.getElementById('cart');
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  // Clear the previous cart items
  cartItemsElement.innerHTML = '';

  // Display each product in the cart
  cart.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.textContent = `${item.name} - Quantity: ${item.quantity}`;
    cartItemsElement.appendChild(cartItem);
  });

  // Calculate and display the total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  cartTotalElement.textContent = `Total: ₹${totalPrice}`;

  // Show the cart
  cartElement.style.display = 'block';
}
