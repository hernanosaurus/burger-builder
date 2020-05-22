import React, { Component } from 'react';

import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';
// import breadTop from '../../../assets/Images/Ingredients/burgerTop-img.png';
// import lettuce from '../../../assets/Images/Ingredients/lettuce-img.png';
// import tomato from '../../../assets/Images/Ingredients/tomato-img.png';
// import cheese from '../../../assets/Images/Ingredients/cheese-img.png';
// import meat from '../../../assets/Images/Ingredients/meat-img.png';
// import breadBottom from '../../../assets/Images/Ingredients/burgerBottom-img.png';

class BurgerIngredient extends Component {
	render() {
		let ingredient = null;

		switch (this.props.type) {
			case 'bread-top':
				ingredient = (
					<div className={classes.BreadTop}>
						<div className={classes.Seeds1} />
						<div className={classes.Seeds2} />
					</div>
				);
				break;
			case 'egg':
				ingredient = (
					<div className={classes.Egg}>
						<div className={classes.EggYolk} />
					</div>
				);
				break;
			case 'bacon':
				ingredient = <div className={classes.Bacon} />;
				break;
			case 'lettuce':
				// ingredient = <div className={classes.Lettuce} />;
				ingredient = (
					<div className={classes.Lettuce}>
						<div className={classes.LettuceLeaves1} />
						<div className={classes.LettuceLeaves2} />
						<div className={classes.LettuceLeaves3} />
						<div className={classes.LettuceLeaves4} />
						<div className={classes.LettuceLeaves5} />
					</div>
				);
				break;
			case 'cheese':
				ingredient = (
					<div className={classes.Cheese}>
						<div className={classes.CheeseMelt1} />
						<div className={classes.CheeseMelt2} />
						<div className={classes.CheeseMelt3} />
					</div>
				);
				break;
			case 'tomato':
				ingredient = (
					<div className={classes.Tomato}>
						<div className={classes.TomatoSlice1} />
						<div className={classes.TomatoSlice2} />
					</div>
				);
				break;
			case 'onion':
				ingredient = (
					<div className={classes.Onion}>
						<div className={classes.OnionSlice1} />
						<div className={classes.OnionSlice2} />
						<div className={classes.OnionSlice3} />
					</div>
				);
				break;
			case 'pickle':
				ingredient = (
					<div className={classes.Pickle}>
						<div className={classes.PickleSlice1} />
						<div className={classes.PickleSlice2} />
					</div>
				);
				break;
			case 'meat':
				ingredient = <div className={classes.Meat} />;
				break;
			case 'mustard':
				ingredient = <div className={classes.Mustard} />;
				break;
			case 'ketchup':
				ingredient = <div className={classes.Ketchup} />;
				break;
			case 'bread-bottom':
				ingredient = <div className={classes.BreadBottom} />;
				break;
			default:
				ingredient = null;
		}
		return ingredient;
	}
}

BurgerIngredient.propTypes = {
	type : PropTypes.string.isRequired
};

export default BurgerIngredient;
