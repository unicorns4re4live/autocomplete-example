import React from 'react'
import './options.scss'
import { OptionsProps } from '../types'

function Options ({
  options,
  isDisplayed,
  isLoading,
  currentValue,
  handleSelection
}: OptionsProps): JSX.Element | null {
  if (isLoading) {
    return <div className='loading'>Loading...</div>
  }

  if (!isDisplayed) return null

  const highlightInput = (optionValue: string): JSX.Element => {
    const splitRe = new RegExp(`(${currentValue})`, 'gi')
    const optionSplit = optionValue.split(splitRe)

    return (
        <>
        {optionSplit.map((optionPart, i) => (
            <span
                key={ i }
                className={
                  optionPart.toLowerCase() === currentValue.toLowerCase() ? 'highlight' : ''
                }
            >
            { optionPart }
          </span>
        ))}
      </>
    )
  }

  return (
        <ul className='options'>{
            options.map((option) => (
                <li className={ currentValue === option.value ? 'selected' : undefined }
                    key={ option.id }
                    onClick={ () => { handleSelection(option.value) } }>
                  { highlightInput(option.value) }
                </li>
            ))
        }</ul>
  )
}

export default Options
