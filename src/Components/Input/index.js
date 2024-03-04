import React from 'react';
import { InputCustomizado } from './styles'

const Input = ({
  name,
  placeholder,
  onChange,
  type,
  disabled
}) => {
  return ( 
    <InputCustomizado
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      disabled={disabled}
    />
   );
}
 
export default Input;