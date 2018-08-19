import React from 'react';

import './Button.css';

const btn = props => {
	return(
		<div className="group">
		    <button className="button" onClick={props.func}>{props.btnName}</button>
		</div>
	);
}

export default btn;