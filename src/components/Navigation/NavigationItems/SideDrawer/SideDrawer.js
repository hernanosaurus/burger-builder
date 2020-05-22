import React from 'react';

import Logo from '../../../Logo/Logo';
import NavigationItems from '../../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Auxillary from '../../../../hoc/Auxillary/Auxillary';

const sideDrawer = (props) => {
	let attachedClasses = [ classes.SideDrawer, classes.Close ];

	if (props.open) {
		attachedClasses = [ classes.SideDrawer, classes.Open ];
	}

	return (
		<Auxillary>
			<Backdrop open={props.open} close={props.close} />
			<div className={attachedClasses.join(' ')} onClick={props.close}>
				<Logo height={'11%'} />
				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</Auxillary>
	);
};

export default sideDrawer;
