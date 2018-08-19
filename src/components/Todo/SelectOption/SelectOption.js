import React from 'react';

const selectOption = props => {
    return(
        props.option.map(items => {
            return <option key={items} value={items}>{items}</option>
        })
    );
}

export default selectOption;