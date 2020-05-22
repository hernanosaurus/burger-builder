import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/NavigationItems/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer : false
	};

	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer : false
		});
	};

	drawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Auxillary>
				<div className={classes.dimmer}>
					<h1 className={classes.text}>Please view on a larger screen</h1>
					<i className="fas fa-desktop" />
				</div>
				<div className={classes.fullWrapper}>
					<div className={classes.mobileWrapper}>
						<div className={classes.CenterWrapper}>
							<Toolbar
								isAuth={this.props.isAuthenticated}
								drawerToggleClicked={this.drawerToggleHandler}
							/>
							<SideDrawer
								isAuth={this.props.isAuthenticated}
								open={this.state.showSideDrawer}
								close={this.sideDrawerClosedHandler}
							/>
							<main className={classes.content}>{this.props.children}</main>
						</div>
					</div>
				</div>
			</Auxillary>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated : state.auth.token !== null
	};
};

export default connect(mapStateToProps)(Layout);
