import React, { Component } from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import egg from '../../../assets/Images/Ingredients/egg-icon.png';
import bacon from '../../../assets/Images/Ingredients/bacon-icon.png';
import lettuce from '../../../assets/Images/Ingredients/lettuce-icon.png';
import tomato from '../../../assets/Images/Ingredients/tomato-icon.png';
import onion from '../../../assets/Images/Ingredients/onion-icon.png';
import pickle from '../../../assets/Images/Ingredients/pickle-icon.png';
import cheese from '../../../assets/Images/Ingredients/cheese-icon.png';
import meat from '../../../assets/Images/Ingredients/meat-icon.png';
import mustard from '../../../assets/Images/Ingredients/mustard-icon.png';
import ketchup from '../../../assets/Images/Ingredients/ketchup-icon.png';

const controls = [
	{ label: 'Egg', type: 'egg', img: egg, qty: 0, price: 5.0 },
	{ label: 'Bacon', type: 'bacon', img: bacon, qty: 0, price: 10.0 },
	{ label: 'Lettuce', type: 'lettuce', img: lettuce, qty: 0, price: 3.0 },
	{ label: 'Tomato', type: 'tomato', img: tomato, qty: 0, price: 0.25 },
	{ label: 'Onion', type: 'onion', img: onion, qty: 0, price: 0.25 },
	{ label: 'Pickle', type: 'pickle', img: pickle, qty: 0, price: 0.25 },
	{ label: 'Cheese', type: 'cheese', img: cheese, qty: 0, price: 8.0 },
	{ label: 'Meat', type: 'meat', img: meat, qty: 0, price: 20.0 },
	{ label: 'Mustard', type: 'mustard', img: mustard, qty: 0, price: 0.0 },
	{ label: 'Ketchup', type: 'ketchup', img: ketchup, qty: 0, price: 0.0 }
];

class BuildControls extends Component {
	state = {
		openIng : false
	};

	openIngredients = () => {
		this.state.openIng ? this.setState({ openIng: false }) : this.setState({ openIng: true });
	};

	render() {
		const transformedQtyInfo = {
			...this.props.ingredientQty
		};

		let ictr = 0;

		controls.map((ctrl) => {
			ctrl.qty = transformedQtyInfo[ictr];
			ictr++;

			return ctrl.qty;
		});

		return (
			<div
				className={classes.BuildControls}
				style={{
					transform : this.state.openIng ? 'translateY(0)' : 'translateY(90%)'
				}}
			>
				<div className={classes.IngredientControls}>
					{this.state.openIng ? (
						<button className={classes.IngredientButton} onClick={this.openIngredients}>
							<p>add ingredients</p>
							<i className="fas fa-angle-down" />
						</button>
					) : (
						<button className={classes.IngredientButton} onClick={this.openIngredients}>
							<p>add ingredients</p>
							<i className="fas fa-angle-up" />
						</button>
					)}

					<div className={classes.Wrapper}>
						{/* <div className={classes.Instruction}>
							<p>Scrolldown</p>
							<i className="fas fa-angle-double-down" />
						</div> */}
						<div className={classes.IngredientItems}>
							{controls.map((ctrl) => (
								<BuildControl
									key={ctrl.label}
									label={ctrl.label}
									price={ctrl.price.toFixed(2)}
									imgsrc={ctrl.img}
									added={() => this.props.ingredientAdded(ctrl.type)}
									removed={() => this.props.ingredientRemoved(ctrl.type)}
									quantity={ctrl.qty}
									lessDisabled={this.props.lessDisabled[ctrl.type]}
								/>
							))}
						</div>

						<button
							className={classes.OrderButton}
							disabled={!this.props.purchaseable}
							onClick={this.props.ordered}
						>
							<strong>{this.props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</strong>
						</button>
					</div>
				</div>

				{/* <p className={classes.Total}>
					TOTAL PRICE: <strong> $ {this.props.price.toFixed(2)} </strong>
				</p> */}
			</div>
		);
	}
}

export default BuildControls;
