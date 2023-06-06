import React from 'react';
import "./component.css"

const Button = ({ onClick, children, isLoading }) => {

  return (
    <button onClick={onClick} className={isLoading ? 'button-disabled' : 'button-enabled'} disabled={isLoading}>
      {children}
    </button>
  );
};

export default Button;