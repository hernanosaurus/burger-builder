import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import axios from '../../../AxiosOrders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
	state = {
		orderForm   : {
			name    : {
				elementType   : 'input',
				elementConfig : {
					type        : 'text',
					placeholder : 'Your Name'
				},
				value         : '',
				validation    : {
					required : true
				},
				hint          : 'far fa-user',
				label         : 'Name',
				valid         : false,
				touched       : false
			},
			address : {
				elementType   : 'input',
				elementConfig : {
					type        : 'text',
					placeholder : 'Your Address'
				},
				value         : '',
				validation    : {
					required : true
				},
				hint          : 'fas fa-map-marker-alt',
				label         : 'Address',
				valid         : false,
				touched       : false
			},
			phone   : {
				elementType   : 'input',
				elementConfig : {
					type        : 'text',
					placeholder : 'Contact Number'
				},
				value         : '',
				validation    : {
					required  : true,
					minLength : 7,
					maxLength : 11,
					isNumeric : true
				},
				hint          : 'fas fa-phone',
				label         : 'Phone',
				valid         : false,
				touched       : false
			}
		},
		formIsValid : false
	};

	orderHandler = (event) => {
		event.preventDefault();

		const formData = {};

		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients : this.props.ings,
			price       : this.props.price,
			orderData   : formData,
			userId      : this.props.userId
		};

		this.props.onOrderBurger(order, this.props.token);
	};

	cancelOrder = (event) => {
		event.preventDefault();
		this.props.history.goBack();
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updateFormElement = updateObject(this.state.orderForm[inputIdentifier], {
			value   : event.target.value,
			valid   : checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
			touched : true
		});

		const updatedOrderForm = updateObject(this.state.orderForm, {
			[inputIdentifier] : updateFormElement
		});

		let formIsValid = true;

		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id     : key,
				config : this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler} style={{ width: '100%' }}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						label={formElement.config.label}
						hint={formElement.config.hint}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<div className={classes.Buttons}>
					<Button btnType="Success" disabled={!this.state.formIsValid}>
						ORDER <i className="fas fa-arrow-right" />
					</Button>
					<Button btnType="Danger" clicked={this.cancelOrder}>
						CANCEL <i className="far fa-times-circle" />
					</Button>
				</div>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<Auxillary>
				<div className={classes.Dimmer} />
				<div className={classes.ContactData}>
					<h3 className={classes.Title}>Contact Data</h3>
					{form}
				</div>
			</Auxillary>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings    : state.burgerBuilder.ingredients,
		price   : state.burgerBuilder.totalPrice,
		loading : state.order.loading,
		token   : state.auth.token,
		userId  : state.auth.userId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
