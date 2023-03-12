import React, { useState, useEffect } from "react";
import "./style/main.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import ShoppingCart from "./components/ShoppingCart";


const products = [
	{
		id: 1,
		name: "Macbook Air",
		price: 1299,
		image: require("./assets/images/macbook.jpg"),
	},
	{
		id: 2,
		name: "iPhone 14 Pro",
		price: 999,
		image: require("./assets/images/iphone.jpg"),
	},
	{
		id: 3,
		name: "Apple Watch",
		price: 499,
		image: require("./assets/images/applewatch.jpg"),
	},
];



function App() {

	const [username, setUsername] = useState('');
	const [phonenum, setPhonenum] = useState('');
	const [email, setEmail] = useState('');
	const [mailingList, setMailingList] = useState(false);
	
	
	const Register = () => {
		return (
			<div>
				<form className="regisForm">
					<p>Name</p>
					<input type="text" placeholder="John Doe" required></input>
					<p>Phone Number</p>
					<input type="text" placeholder="123-456-7890" required></input>
					<p>Email Address</p>
					<input type="email"  placeholder="example@exmaple.com" required></input>
					<p>Join mailing list?</p>
					<div className="radios">
						<p>Yes</p>
						<input type="radio" id="yes" name="fav_language" value="Yes"></input>
						<p>No</p>
						<input type="radio" id="no" name="fav_language" value="No"></input>
					</div>
					<button className="submitButton" type="submit">Submit</button>
				</form>
			</div>
		);
	};

	const Home = () => {
		return (
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<span className="product-price">
								{product.price}$
							</span>
							<div className="buttons">
								<button
									className="btn"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		);
	};

	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (


		<div className="App">
			<BrowserRouter>
				<div className="navbar">
					<Link to="/home"><h3 className="logo">Home </h3></Link>
					<Link to="/register"><h2>Register</h2></Link>
					<button
						className="btn shopping-cart-btn"
						onClick={() =>
							setCartVisible(true)
						}>
						<HiShoppingCart size={30} />
						{productsInCart.length >
							0 && (
								<span className="product-count">
									{
										productsInCart.length
									}
								</span>
							)}
					</button>
				</div>
				<Routes>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/register" element={<Register />}></Route>
				</Routes>
			</BrowserRouter>
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>


		</div>
	);
}

export default App;
