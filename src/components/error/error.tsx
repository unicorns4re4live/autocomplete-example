import React from 'react'
import './error.scss'
import { ErrorMessageProps } from './types'

function ErrorMessage ({ error }: ErrorMessageProps): JSX.Element | null {
  return error.length > 0 ? <p className='error'>{ error }</p> : null
}

export default ErrorMessage
