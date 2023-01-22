import React, { useEffect, useRef, useState } from 'react'
import './autocomplete.scss'
import Options from './components/options'
import { AutocompleteConfigs, AutocompleteProps, Option } from './types'
import ErrorMessage from '../error'

function Autocomplete ({
  apiData,
  delay = 300,
  placeholder = 'Some value'
}: AutocompleteProps): JSX.Element {
  const [configs, setConfigs] = useState<AutocompleteConfigs>({
    delay,
    placeholder,
    apiData,
    options: [],
    isDataLoading: false,
    isFocused: false,
    error: ''
  })
  const [inputValue, setInputValue] = useState<string>('')
  const blurTimeout = useRef<NodeJS.Timeout | null>(null)
  const debounceCall = useRef<NodeJS.Timeout | null>(null)

  const shouldOptionsBeDisplayed = inputValue.length > 0 &&
      configs.isFocused &&
      configs.options.length > 0

  useEffect(() => {
    return () => {
      // clear timeouts to prevent errors on component unmount
      if (blurTimeout.current !== null) {
        clearTimeout(blurTimeout.current)
      }
      if (debounceCall.current != null) {
        clearTimeout(debounceCall.current)
      }
    }
  }, [])

  useEffect(() => {
    setConfigs({ ...configs, error: '' })
    if (inputValue.length > 0) {
      debounceCall.current = setTimeout(loadOptions, configs.delay)

      return () => {
        if (debounceCall.current != null) {
          clearTimeout(debounceCall.current)
        }
      }
    }
  }, [inputValue])

  const handleSelection = (value: string): void => {
    setInputValue(value)
    setConfigs({ ...configs, isFocused: false })
  }

  const getLocalData = async (): Promise<Option[]> => {
    const optionsResp = await fetch(`${window.location.origin}/data.json?input=${inputValue}`)
    const options = await optionsResp.json()
    return options
      .filter((option: Option) => option.value.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const getApiData = async (): Promise<Option[]> => {
    if (configs.apiData === undefined) return []
    const optionsResp = await fetch(`${configs.apiData?.url}${inputValue}`)
    let optionsData = await optionsResp.json()
    const valueKeysNesting = configs.apiData.valueKeysNesting

    for (let i = 0; i < valueKeysNesting.length - 1; i++) {
      optionsData = optionsData[valueKeysNesting[i]]
    }

    const lastKey = valueKeysNesting[valueKeysNesting.length - 1]

    return optionsData.map((optionData: Record<string, string>, i: number) => ({
      id: i,
      value: optionData[lastKey]
    }))
  }

  const loadOptions = async (): Promise<void> => {
    try {
      setConfigs({ ...configs, isDataLoading: true })

      let options: Option[]
      console.log(configs)
      if (configs.apiData === undefined) {
        options = await getLocalData()
      } else {
        options = await getApiData()
      }
      setConfigs(configs => ({ ...configs, isDataLoading: false, options }))
    } catch (e) {
      console.error(e)
      setConfigs(configs => ({ ...configs, options: [], isDataLoading: false, error: 'Request error' }))
    }
  }

  return (
        <div className='autocomplete'>
            <input type='text'
                   placeholder={ configs.placeholder }
                   value={ inputValue }
                   onBlur={ () => {
                     blurTimeout.current = setTimeout(() => {
                       setConfigs({ ...configs, isFocused: false })
                     }, 90) // Without set timeout it breaks onClick in child comp
                   } }
                   onFocus={ () => {
                     setConfigs({ ...configs, isFocused: true })
                   } }
                   onChange={ (e) => {
                     setInputValue(e.target.value)
                   } }
            />

            <ErrorMessage error={ configs.error }/>

            <Options options={ configs.options }
                     currentValue={ inputValue }
                     isLoading={ configs.isDataLoading }
                     isDisplayed={ shouldOptionsBeDisplayed }
                     handleSelection={ handleSelection }
            />
        </div>
  )
}

export default Autocomplete
