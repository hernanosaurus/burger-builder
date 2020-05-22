import React from 'react';

import classes from './Burger.css';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [ ...Array(props.ingredients[igKey]) ].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p className={classes.defaultText}>choose your ingredients!</p>;
	}

	return (
		<Auxillary>
			<div className={classes.Burger}>
				<BurgerIngredient type="bread-top" />
				{transformedIngredients}
				<BurgerIngredient type="bread-bottom" />
			</div>

			<div className={classes.Heading}>
				<div className={classes.Total}>
					<p className={classes.Title}>{props.title}</p>
					<h1 className={classes.Price}>{props.price.toFixed(2)}</h1>
				</div>
			</div>
		</Auxillary>
	);
};

export default burger;
