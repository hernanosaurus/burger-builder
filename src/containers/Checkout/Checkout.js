import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import classes from './Checkout.css';

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		let summary = <Redirect to="/" />;

		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

			summary = (
				<div className={classes.CheckoutWrapper}>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						price={this.props.price}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinue={this.checkoutContinueHandler}
					/>
					<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings      : state.burgerBuilder.ingredients,
		price     : state.burgerBuilder.totalPrice,
		purchased : state.order.purchased
	};
};

export default connect(mapStateToProps)(Checkout);
