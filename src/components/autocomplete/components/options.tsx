import React from 'react';
import './options.scss';
import { Option } from "../types";

function Options({options}: {options: Option[]}) {
    if(!!options.length) {
        return (
            <ul className='options'>{
                options.map((option) => (
                    <li>{option.displayValue}</li>
                ))
            }</ul>
        )
    }
    return null;
}



export default Options;