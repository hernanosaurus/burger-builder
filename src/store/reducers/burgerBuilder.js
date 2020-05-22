import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients : null,
	totalPrice  : 10,
	error       : false,
	building    : false
};

const INGREDIENT_PRICES = {
	egg     : 5.0,
	bacon   : 10.0,
	lettuce : 3.0,
	tomato  : 0.25,
	onion   : 0.25,
	pickle  : 0.25,
	cheese  : 8.0,
	meat    : 20.0,
	mustard : 0.0,
	ketchup : 0.0
};

const addIngredient = (state, action) => {
	return {
		...state,
		ingredients : {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName] + 1
		},
		totalPrice  : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building    : true
	};
};

const removeIngredient = (state, action) => {
	return {
		...state,
		ingredients : {
			...state.ingredients,
			[action.ingredientName]: state.ingredients[action.ingredientName] - 1
		},
		totalPrice  : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
		building    : true
	};
};

const setIngredient = (state, action) => {
	return {
		...state,
		ingredients : {
			egg     : action.ingredients.egg,
			bacon   : action.ingredients.bacon,
			lettuce : action.ingredients.lettuce,
			tomato  : action.ingredients.tomato,
			onion   : action.ingredients.onion,
			pickle  : action.ingredients.pickle,
			cheese  : action.ingredients.cheese,
			meat    : action.ingredients.meat,
			mustard : action.ingredients.mustard,
			ketchup : action.ingredients.ketchup
		},
		totalPrice  : 10,
		error       : false,
		building    : false
	};
};

const fetchIngredientFailed = (state, action) => {
	return {
		...state,
		error : true
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return setIngredient(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientFailed(state, action);
		default:
			return state;
	}
};

export default reducer;
