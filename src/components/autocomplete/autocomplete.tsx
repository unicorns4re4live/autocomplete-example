import React, {useState} from 'react';
import './autocomplete.scss';
import Options from './components/options';
import {AutocompleteConfigs} from './types';

function Autocomplete() {
  const [configs, setConfigs] = useState<AutocompleteConfigs>({
    delay: 200,
    placeholder: 'John D',
    options: [
      {displayValue: 'AAAAA', value: 'aaa'},
      {displayValue: 'BBBBB', value: 'bbb'},
      {displayValue: 'CCCCC', value: 'ccc'},
    ]
  })

  const handleChange = (value: string) => {
    //find API to get data or somewhere else
  };

  return (
      <div className='autocomplete'>
        <input  placeholder={configs.placeholder} />
        <Options options={configs.options} />
      </div>
  );
}


export default Autocomplete;