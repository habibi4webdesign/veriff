import React, { FC, ReactNode } from 'react';
//styles
import style from './Button.module.scss';

interface IButtonProps {
  type?: 'btnPrimary' | 'btnSecondary' | 'btnDefault';
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = (props) => {
  const {
    type = 'btnPrimary',
    children,
    onClick,
    onKeyPress,
    className,
    disabled,
  } = props;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onKeyPress={onKeyPress}
      className={`${style.btn} ${style[type]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
