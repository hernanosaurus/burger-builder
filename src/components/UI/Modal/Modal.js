import React, { Component } from 'react';

import classes from './Modal.css';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.open !== this.props.open || nextProps.children !== this.props.children;
	}

	render() {
		return (
			<Auxillary>
				<Backdrop open={this.props.open} close={this.props.close} />

				<div
					className={classes.Wrapper}
					style={{
						transform : this.props.open ? 'translateY(0)' : 'translateY(-100vh)',
						opacity   : this.props.open ? '1' : '0'
					}}
				>
					<div className={classes.Modal}>{this.props.children}</div>
				</div>
			</Auxillary>
		);
	}
}

export default React.memo(Modal);
