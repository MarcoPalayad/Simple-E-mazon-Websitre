import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
	let productPriceCent = 0;

	let shippingPriceSet = 0;

	cart.forEach((cartItem) => {
		const product = getProduct(cartItem.productId);
		productPriceCent += product.priceCents * cartItem.quantity;

		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
		shippingPriceSet += deliveryOption.priceCents;
	});

	const totalBeforeTax = productPriceCent + shippingPriceSet;
	const taxCents = totalBeforeTax * 0.1;
	const totalAfterTax = totalBeforeTax + taxCents;

	const paymentSummaryHTML = `
	 		<div class="payment-summary-title">
            Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">
        	$${formatCurrency(productPriceCent)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
        	$${formatCurrency(shippingPriceSet)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">.
        	$${formatCurrency(totalBeforeTax)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
        	$${formatCurrency(taxCents)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
        	$${formatCurrency(totalAfterTax)}
        </div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
		`;
	
	document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
	
}
