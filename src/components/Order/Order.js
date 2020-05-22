import React from 'react';
import classes from './Order.css';

const order = (props) => {
	const ingredients = [];

	for (let ingredientName in props.ingredients) {
		ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] });
	}

	const ingredientOutput = ingredients.map((ig) => {
		if (ig.amount >= 1) {
			return (
				<span className={classes.OrderItems} key={ig.name}>
					{ig.name} : {ig.amount}
				</span>
			);
		} else {
			return null;
		}
	});

	return (
		<div className={classes.Order}>
			<div className={classes.Right}>
				<p className={classes.Label}>Burger Ingredients: </p>
				<div>{ingredientOutput}</div>
			</div>
			<div className={classes.Total}>
				<p>Total:</p>
				<p className={classes.Price}>P {Number.parseFloat(props.price).toFixed(2)}</p>
			</div>
		</div>
	);
};

export default order;
