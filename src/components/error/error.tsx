import React from 'react';
import './error.scss';
import { ErrorMessageProps } from './types';

function ErrorMessage({ error }: ErrorMessageProps) {
   return error ? <p className='error'>{ error }</p> : null;
}

export default ErrorMessage;