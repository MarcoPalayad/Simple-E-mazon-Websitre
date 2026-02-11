import { cart, addToCart, calcCartQty } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateCheckoutQty } from "/scripts/checkout.js";

let productsHTML = "";

products.forEach((product) => {
	productsHTML += `
		<div class="product-container">
			<div class="product-image-container">
				<img class="product-image" src="${product.image}" />
			</div>

			<div class="product-name limit-text-to-2-lines">${product.name}</div>

			<div class="product-rating-container">
				<img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" />
				<div class="product-rating-count link-primary">${product.rating.count}</div>
			</div>

			<div class="product-price">${formatCurrency(product.priceCents)}</div>

			<div class="product-quantity-container">
				<select class="js-qty-selector-${product.id}">
					<option selected value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="9">9</option>
					<option value="10">10</option>
				</select>
			</div>

			<div class="product-spacer"></div>

			<div class="added-to-cart js-cart-added-${product.id} ">
				<img src="images/icons/checkmark.png" />
				Added
			</div>

			<button class="add-to-cart-button button-primary js-add-to-cart"
			data-product-id="${product.id}"
			>Add to Cart</button>
		</div>
	`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

let timeoutId;

function updateCartQty() {
	const cartQty = calcCartQty();

	const cartQtyElement = document.querySelector(".js-cart-quantity");

	if (cartQtyElement) {
		cartQtyElement.innerHTML = cartQty;
	}

	updateCheckoutQty();
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
	button.addEventListener("click", () => {
		const { productId } = button.dataset;

		addToCart(productId);

		updateCartQty();

		clearTimeout(timeoutId);

		const addedMessage = document.querySelector(`.js-cart-added-${productId}`);

		addedMessage.classList.add("added-message-visible");

		setTimeout(() => {
			addedMessage.classList.remove("added-message-visible");
		}, 2000);
	});
});

updateCartQty();
