export const cart = [];

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
		});
	}
}
