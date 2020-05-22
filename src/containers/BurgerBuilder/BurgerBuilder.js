import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummay from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../AxiosOrders';
// import * as actionTypes from '../../store/actions/actionTypes';
import classes from './BurgerBuilder.css';

class BurgerBuilder extends Component {
	state = {
		purchasing : false
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	};

	// 	updatedIngredients[type] = updatedCount;

	// 	const priceDeduction = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - priceDeduction;

	// 	this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });

	// 	this.updatePurchaseState(updatedIngredients);
	// };

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};

	render() {
		const quantityInfo = {
			...this.props.ings
		};

		const quantity = [];

		for (let key in quantityInfo) {
			quantity.push(quantityInfo[key]);
		}

		const totalInfo = {
			...this.props.ings
		};

		const total = [];

		for (let key in totalInfo) {
			total.push(totalInfo[key]);
		}

		const lessDisabledInfo = {
			...this.props.ings
		};

		for (let key in lessDisabledInfo) {
			lessDisabledInfo[key] = lessDisabledInfo[key] <= 0;
		}

		let orderSummary = null;
		let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
		let title = 'my amazing burger';

		if (this.props.ings) {
			burger = (
				<Auxillary>
					<div className={classes.BurgerBuilder}>
						<Burger ingredients={this.props.ings} price={this.props.price} title={title} />
						<BuildControls
							ingredientAdded={this.props.onIngredientAdded}
							ingredientRemoved={this.props.onIngredientRemoved}
							ingredientQty={quantity}
							// ingredientPrices={INGREDIENT_PRICES}
							lessDisabled={lessDisabledInfo}
							purchaseable={this.updatePurchaseState(this.props.ings)}
							ordered={this.purchaseHandler}
							price={this.props.price}
							open={this.state.openIng}
							isAuth={this.props.isAuthenticated}
						/>
					</div>
				</Auxillary>
			);

			orderSummary = (
				<OrderSummay
					ingredients={this.props.ings}
					price={this.props.price}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
				/>
			);
		}

		// if (this.state.loading) {
		// 	orderSummary = <Spinner />;
		// }

		return (
			<Auxillary>
				{burger}
				<Modal open={this.state.purchasing} close={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
			</Auxillary>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings            : state.burgerBuilder.ingredients,
		price           : state.burgerBuilder.totalPrice,
		error           : state.burgerBuilder.error,
		isAuthenticated : state.auth.token !== null
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded     : (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved   : (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients     : () => dispatch(actions.initIngredients()),
		onInitPurchase        : () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
