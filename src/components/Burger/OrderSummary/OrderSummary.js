import React, { Component } from 'react';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

class OrderSummary extends Component {
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
			if (this.props.ingredients[igKey] >= 1) {
				return (
					<li className={classes.List} key={igKey}>
						<span>{igKey}</span>: {this.props.ingredients[igKey]}
					</li>
				);
			} else {
				return null;
			}
		});

		return (
			<Auxillary>
				<h3 className={classes.Title}>Order Summary</h3>
				<p className={classes.Description}>A delicious burger with the following ingredients:</p>
				<ul className={classes.IngredientSummary}>{ingredientSummary}</ul>
				<div className={classes.Total}>
					<p>Total:</p>
					<p className={classes.Price}>
						<strong>P {this.props.price.toFixed(2)}</strong>
					</p>
				</div>

				<p className={classes.Checkout}> Continue to Checkout?</p>
				<div className={classes.Buttons}>
					<Button btnType={'Success'} clicked={this.props.purchaseContinue}>
						CONTINUE <i className="fas fa-arrow-right" />
					</Button>
					<Button btnType={'Danger'} clicked={this.props.purchaseCanceled}>
						CANCEL <i className="far fa-times-circle" />
					</Button>
				</div>
			</Auxillary>
		);
	}
}

export default OrderSummary;
