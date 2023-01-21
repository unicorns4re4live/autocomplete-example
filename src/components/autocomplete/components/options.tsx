import React from 'react';
import './options.scss';
import {OptionsProps} from '../types';

function Options({   options,
                     isDisplayed,
                     isLoading,
                     currentValue,
                     handleSelection }: OptionsProps) {
    if (!isDisplayed) return null;

    if (isLoading) {
        return <div className='loading'>Loading...</div>
    }

    return (
        <ul className='options'>{
            options.map((option) => (
                <li className={currentValue === option.value ? 'selected' : undefined}
                    key={option.id}
                    onClick={() => handleSelection(option.value)}>
                    {option.value}
                </li>
            ))
        }</ul>
    )
}


export default Options;