export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
	cart = [
		{
			productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
			quantity: 2,
			deliveryOptionId: "1",
		},
		{
			productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
			quantity: 1,
			deliveryOptionId: "2",
		},
	];
}

function saveToStorage() {
	localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
	let matchingItem;

	const productValue = Number(document.querySelector(`.js-qty-selector-${productId}`).value);

	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}
	});

	if (matchingItem) {
		matchingItem.quantity += productValue;
	} else {
		cart.push({
			productId,
			quantity: productValue,
			deliveryOptions: "1",
		});
	}

	saveToStorage();
}

export function removeFromCart(productId) {
	const newCart = [];

	cart.forEach((cartItem) => {
		if (cartItem.productId !== productId) {
			newCart.push(cartItem);
		}
	});

	cart = newCart;

	saveToStorage();
}

export function calcCartQty() {
	let checkoutQty = 0;

	cart.forEach((cartItem) => {
		checkoutQty += cartItem.quantity;
	});

	return checkoutQty;
}

export function updateItemQty(productId, newQuantity) {
	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) {
			cartItem.quantity = newQuantity;
		}
	});
	saveToStorage();
}
