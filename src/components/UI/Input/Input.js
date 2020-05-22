import React from 'react';
import classes from './Input.css';

const input = (props) => {
	let inputElement = null;
	// let validationError = null;

	const inputClasses = [ classes.inputElement ];

	let validationError = (
		<p className={classes.ValidationHint}>
			<i className={props.hint} />
		</p>
	);

	if (props.invalid && props.shouldValidate && props.touched) {
		validationError = (
			<p className={classes.ValidationError}>
				<i className="fas fa-times" />
			</p>
		);
	}

	if (!props.invalid) {
		validationError = (
			<p className={classes.ValidationPassed}>
				<i className="fas fa-check" />
			</p>
		);
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			<div className={classes.InputElements}>
				{validationError}
				{inputElement}
			</div>
		</div>
	);
};

export default input;
