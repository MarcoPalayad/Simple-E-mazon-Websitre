import { cart, removeFromCart, calcCartQty, updateItemQty } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/delivery.js";

// const today = dayjs();
// const deliveryDate = today.add(7, "days");
// deliveryDate.format("dddd, MMMM D");

let cartSummary = "";

cart.forEach((cartItem) => {
	const productId = cartItem.productId;

	let matchingProduct;

	products.forEach((product) => {
		if (product.id === productId) {
			matchingProduct = product;
		}
	});

	cartSummary += `
		<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
		  <div class="delivery-date">
		    Delivery date: Tuesday, June 21
		  </div>

		  <div class="cart-item-details-grid">
		    <img class="product-image"
		      src="${matchingProduct.image}">

		    <div class="cart-item-details">
		      <div class="product-name">
		        ${matchingProduct.name}
		      </div>
		      <div class="product-price">
		        ${formatCurrency(matchingProduct.priceCents)}
		      </div>
		      <div class="product-quantity">
		        <span>
		          Quantity: <span class="quantity-label js-qty-label-${matchingProduct.id}">${cartItem.quantity}</span>
		        </span>
		        <span class="update-quantity-link link-primary js-item-qty-update" data-product-id="${matchingProduct.id}">
		          Update
		        </span>
						<input class="item-qty-input js-qty-input-${matchingProduct.id}">
						<span class="save-qty link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
		        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
		          Delete
		        </span>
		      </div>
		    </div>
		    <div class="delivery-options">
		      <div class="delivery-options-title">
		        Choose a delivery option:
		      </div>
					${deliveryOptionsHTML(matchingProduct)}
		    </div>
		  </div>
		</div>
	`;
});

function deliveryOptionsHTML(matchingProduct) {
	let html = "";

	deliveryOptions.forEach((deliveryDateOptions) => {
		const today = dayjs();

		const deliveryDate = today.add(deliveryDateOptions.deliveryDate, "days");

		const dateString = deliveryDate.format("dddd, MMMM, D");

		const priceString = deliveryDateOptions.priceCents === 0 ? "Free" : `${formatCurrency(deliveryDateOptions.priceCents)} -`;

		html +=`
			<div class="delivery-option">
	    	<input type="radio"
	      class="delivery-option-input"
	      name="delivery-option-${matchingProduct.id}">
			  <div>
		      <div class="delivery-option-date">
		      	${dateString}
		      </div>
		      <div class="delivery-option-price">
		        ${priceString} Shipping
		      </div>
				</div>
	    </div>
		`;
	});
	return html;
}

const cartSummaryElement = document.querySelector(".js-cart-summary");

if (cartSummaryElement) {
	cartSummaryElement.innerHTML = cartSummary;
}

document.querySelectorAll(".js-delete-link").forEach((link) => {
	link.addEventListener("click", () => {
		const productId = link.dataset.productId;
		removeFromCart(productId);

		const deletedProduct = document.querySelector(`.js-cart-item-container-${productId}`);

		deletedProduct.remove();

		updateCheckoutQty();
	});
});

document.querySelectorAll(".js-item-qty-update").forEach((updateQty) => {
	updateQty.addEventListener("click", () => {
		const updateItemQty = updateQty.dataset.productId;

		const itemContainer = document.querySelector(`.js-cart-item-container-${updateItemQty}`);

		itemContainer.classList.add("is-editing-quantity");
	});
});

document.querySelectorAll(".js-save-link").forEach((saveQty) => {
	saveQty.addEventListener("click", () => {
		const saveQtyId = saveQty.dataset.productId;

		const saveQtyContainer = document.querySelector(`.js-cart-item-container-${saveQtyId}`);

		saveQtyContainer.classList.remove("is-editing-quantity");

		const itemQtyUpdate = Number(document.querySelector(`.js-qty-input-${saveQtyId}`).value);

		if (itemQtyUpdate >= 0 && itemQtyUpdate < 1000) {
			updateItemQty(saveQtyId, itemQtyUpdate);

			const labelUpdate = document.querySelector(`.js-qty-label-${saveQtyId}`);

			labelUpdate.innerHTML = itemQtyUpdate;

			updateCheckoutQty();
		} else {
			alert("Quantity must be at least 0 and less than 1000");
		}
	});
});

export function updateCheckoutQty() {
	const checkoutQty = calcCartQty();

	const checkoutElement = document.querySelector(".js-checkout-qty");

	if (checkoutElement) {
		if (checkoutQty <= 1) {
			checkoutElement.innerHTML = `Checkout (${checkoutQty}) Item`;
		} else {
			checkoutElement.innerHTML = `Checkout (${checkoutQty}) Items`;
		}
	}
}

updateCheckoutQty();
