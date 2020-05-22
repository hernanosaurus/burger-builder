import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
	let title = 'Enjoy your Burger!';

	return (
		<div className={classes.CheckoutSummary}>
			<Burger ingredients={props.ingredients} price={props.price} title={title} />
			<div className={classes.Wrapper}>
				<div className={classes.Buttons}>
					<Button btnType="SuccessLrg" clicked={props.checkoutContinue}>
						CONTINUE <i className="fas fa-arrow-right" />
					</Button>
					<Button btnType="DangerLrg" clicked={props.checkoutCancelled}>
						CANCEL <i className="far fa-times-circle" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default checkoutSummary;
