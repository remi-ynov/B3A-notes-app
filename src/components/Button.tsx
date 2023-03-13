import React from 'react';

interface Props {

}

const Button: React.FC<Props> = (props) => {
  return (
    <button
      type="button"
      onClick={() => console.log('Click')}
    >
        CREER UNE NOTE
    </button>
  );
};

export default Button;