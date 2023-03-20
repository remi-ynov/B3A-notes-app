import React from 'react';

interface Props {
  onClick: () => void;
  text: string;
  type?: 'button'|'submit';
  disabled?: boolean;
}

const Button: React.FC<Props> = (props) => {
  const {
    onClick, text, type, disabled,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 p-4 text-white rounded-xl flex justify-center"

    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
};

export default Button;
