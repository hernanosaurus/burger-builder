import React from 'react';
import classes from './Spinner.css';

// const spinner = (props) => <div className={classes.Loader} />;

const spinner = (props) => {
	return (
		<div className={classes.Wrapper}>
			<div className={classes.Loader} />
		</div>
	);
};

export default spinner;
