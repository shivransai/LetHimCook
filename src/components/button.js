import React from 'react';
import "./component.css"

const Button = ({ onClick, children, isLoading }) => {

  return (
    <div className='button-div'>
    <button onClick={onClick} className={isLoading ? 'button-disabled' : 'button-enabled'} disabled={isLoading}>
      {children}
    </button>
    </div>
  );
};

export default Button;