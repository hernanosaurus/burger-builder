import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" exact>
			<i className="fas fa-hamburger" />
			<p>burger</p>
		</NavigationItem>
		{props.isAuthenticated ? (
			<NavigationItem link="/orders">
				<i className="fas fa-list" />
				<p>orders</p>
			</NavigationItem>
		) : null}
		{!props.isAuthenticated ? (
			<NavigationItem link="/auth">
				<i className="fas fa-sign-in-alt" />
				<p>log in</p>
			</NavigationItem>
		) : (
			<NavigationItem link="/logout">
				<i className="fas fa-sign-out-alt" />
				<p>log out</p>
			</NavigationItem>
		)}
	</ul>
);

export default navigationItems;
