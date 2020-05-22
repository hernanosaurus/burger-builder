import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
	state = {
		controls : {
			email    : {
				elementType   : 'input',
				elementConfig : {
					type        : 'email',
					placeholder : 'Enter Email'
				},
				value         : '',
				validation    : {
					required : true,
					isEmail  : true
				},
				hint          : 'fas fa-at',
				label         : 'Email',
				valid         : false,
				touched       : false
			},
			password : {
				elementType   : 'input',
				elementConfig : {
					type        : 'password',
					placeholder : 'Enter Password'
				},
				value         : '',
				validation    : {
					required  : true,
					minLength : 8
				},
				hint          : 'fas fa-lock',
				label         : 'Password',
				valid         : false,
				touched       : false
			}
		},
		isSignup : true
	};

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.onSetAuthRedirectPath();
		}
	}

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName] : {
				...this.state.controls[controlName],
				value   : event.target.value,
				valid   : checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched : true
			}
		};

		this.setState({ controls: updatedControls });
	};

	signInHandler = () => {
		this.setState({ isSignup: false });
	};

	signUpHandler = () => {
		this.setState({ isSignup: true });
	};

	submitHandler = (event) => {
		event.preventDefault();

		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
	};

	// switchAuthModeHandler = () => {
	// 	this.setState((prevState) => {
	// 		return { isSignup: !prevState.isSignup };
	// 	});
	// };

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id     : key,
				config : this.state.controls[key]
			});
		}

		let form = formElementsArray.map((formElement) => (
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
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;

		if (this.props.error) {
			let err = this.props.error.message.replace(/_/g, ' ');
			errorMessage = <p className={classes.errorMessage}>{err}</p>;
		}

		let authRedirect = null;

		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className={classes.Wrapper}>
				<div className={classes.Auth}>
					{authRedirect}
					{errorMessage}

					<div className={classes.Logo}>
						<i className="far fa-smile" />
					</div>

					<p className={classes.Title}>Get Started</p>
					<form onSubmit={this.submitHandler}>
						{form}
						<Button btnType="SignIn" clicked={this.signInHandler}>
							Sign In
						</Button>
						<div className={classes.SignUp}>
							<p className={classes.Label}>Do not have an account?</p>
							<Button btnType="SignUp" clicked={this.signUpHandler}>
								Sign Up
							</Button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading          : state.auth.loading,
		error            : state.auth.error,
		isAuthenticated  : state.auth.token !== null,
		buildingBurger   : state.burgerBuilder.building,
		authRedirectPath : state.auth.authRedirectPath
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth                : (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
