import React from 'react';

import classes from './BuildControl.css';
// import Auxillary from '../../../../hoc/Auxillary';

const buildControl = (props) => {
	return (
		// console.log(props.price);

		<div className={classes.BuildControl}>
			<img src={props.imgsrc} alt={props.label} className={classes.Icon} />

			<div className={classes.Details}>
				<p className={classes.Label}> {props.label} </p>
				<p className={classes.Price}> P {props.price} </p>
			</div>

			<div className={classes.Controls}>
				<button className={classes.Less} onClick={props.removed} disabled={props.lessDisabled}>
					<i className="fas fa-minus" />
				</button>

				<div className={classes.Quantity}>{props.quantity}</div>

				<button className={classes.More} onClick={props.added}>
					<i className="fas fa-plus" />
				</button>
			</div>
		</div>
	);
};

export default buildControl;
