import React from 'react';

import classes from './Backdrop.css';

const backdrop = ( props ) => (
    props.open ? <div className = { classes.Backdrop } onClick = { props.close }></div> : null
);

export default backdrop;