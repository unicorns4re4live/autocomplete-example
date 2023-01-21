import React, { useCallback, useEffect, useState } from 'react';
import './autocomplete.scss';
import Options from './components/options';
import { AutocompleteConfigs, AutocompleteProps, Option } from './types';
import ErrorMessage from '../error/error';

function Autocomplete({ delay, placeholder }: AutocompleteProps) {
  const [configs, setConfigs] = useState<AutocompleteConfigs>({
    delay: delay ?? 300,
    placeholder: placeholder ?? 'Some value',
    options: [],
    isDataLoading: false,
    isFocused: false,
    error: '',
  })
  const [inputValue, setInputValue] = useState<string>('');



  useEffect(() => {
    setConfigs({...configs, error: ''});

    if(!!inputValue.length) {
      const debouncedCall = setTimeout(handleChange, configs.delay);

      return () => {
        clearTimeout(debouncedCall);
      }
    }
  }, [inputValue]);

  const shouldOptionsBeDisplayed = useCallback(() => {
    return !!inputValue.length && configs.isFocused && !!configs.options.length;
  }, [configs.isFocused, configs.options, inputValue]);

  const handleSelection = (value: string) => {
    setInputValue(value);
    setConfigs({ ...configs, isFocused: false });
  }

  const handleChange = async () => {
    try {
      setConfigs({ ...configs, isDataLoading: true });

      const optionsResp = await fetch(`${window.location.origin}/data.json?input=${inputValue}`);
      const options = await optionsResp.json();
      const filteredOptions = options
          .filter((option: Option) => option.value.toLowerCase().includes(inputValue.toLowerCase()));

      setConfigs({ ...configs, isDataLoading: false, options: filteredOptions });
    } catch (e) {
      console.error(e);
      setConfigs({ ...configs, options: [],isDataLoading: false, error: 'Request error' });
    }
  };

  return (
      <div className='autocomplete'>
        <input  type='text'
                placeholder={configs.placeholder}
                value={inputValue}
                autoFocus={false}
                onBlur={() => {
                  setTimeout(() => {
                    setConfigs({...configs, isFocused: false})
                  }, 90)  //Without set timeout it breaks onClick in child comp
                }}
                onFocus={() => setConfigs({...configs, isFocused: true})}
                onChange={(e) => setInputValue(e.target.value)}
        />

        <ErrorMessage error={configs.error} />

        <Options options={configs.options}
                 currentValue={inputValue}
                 isLoading={configs.isDataLoading}
                 isDisplayed={shouldOptionsBeDisplayed()}
                 handleSelection={ handleSelection }
        />
      </div>
  );
}

export default Autocomplete;