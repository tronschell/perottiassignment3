import React from "react";
import "../style/shoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiTrash } from "react-icons/hi";

function ShoppingCart({
	visibilty,
	products,
	onProductRemove,
	onClose,
}) {
	return (
		<div
			className="modal"
			style={{
				display: visibilty
					? "block"
					: "none",
			}}>
			<div className="shoppingCart">
				<div className="header">
					<h2>Cart</h2>
					<button
						className="btn close-btn"
						onClick={onClose}>
						<AiFillCloseCircle size={30}/>
					</button>
				</div>
				<div className="cart-products">
					{products.length === 0 && (
						<span className="empty-text">
							No items in your order.
						</span>
					)}
					{products.map((product) => (
						<div
							className="cart-product"
							key={product.id}>
							<img
								src={
									product.image
								}
								alt={product.name}
							/>
							<div className="product-info">
								<h3>
									{product.name}
								</h3>
								<span className="product-price">
									{product.price}$
								</span>
							</div>
							<button
								className="btn remove-btn"
								onClick={() => onProductRemove(product)}>
								<HiTrash size={30}/>
							</button>
						</div>
					))}
					{products.length > 0 && (
						<button className="btn checkout-btn">
							Checkout
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ShoppingCart;
