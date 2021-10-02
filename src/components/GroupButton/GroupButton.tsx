import Button from 'components/Button';
import React, { FC, useEffect, useState } from 'react';
//styles
import style from './GroupButton.module.scss';

interface IGroupButtonProps {
  onClick: (selected: string) => void;
  className?: string;
  disabled?: boolean;
  leftBtnTitle: string;
  rightBtnTitle: string;
  selectedBtnWithKeyboard: string;
}

type ISelectedButton = string;

const GroupButton: FC<IGroupButtonProps> = (props) => {
  const {
    leftBtnTitle,
    rightBtnTitle,
    onClick,
    disabled = true,
    selectedBtnWithKeyboard,
  } = props;
  const [selectedBtn, setselectedBtn] = useState<ISelectedButton>('');

  const onClickBtn = (clickedBtn: ISelectedButton) => {
    setselectedBtn(clickedBtn);

    //!prevents from the reselecting previously selected answer
    if (selectedBtn !== clickedBtn) {
      onClick(clickedBtn === 'left' ? leftBtnTitle : rightBtnTitle);
    }
  };

  useEffect(() => {
    setselectedBtn(selectedBtnWithKeyboard)
  }, [selectedBtnWithKeyboard])

  useEffect(() => {
    //clears selected button when it's disabled
    if (disabled) {
      setselectedBtn('');
    }
  }, [disabled]);

  return (
    <div className={style.root} role="group">
      <Button
        disabled={disabled}
        onClick={() => onClickBtn('left')}
        className={`${style.leftBtn} ${style.btn} ${
          selectedBtn === 'left' && style.selected
        }`}
      >
        {leftBtnTitle}
      </Button>
      <Button
        disabled={disabled}
        onClick={() => onClickBtn('right')}
        className={`${style.rightBtn} ${style.btn} ${
          selectedBtn === 'right' && style.selected
        }`}
      >
        {rightBtnTitle}
      </Button>
    </div>
  );
};

export default GroupButton;
