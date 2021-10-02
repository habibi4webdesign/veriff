// import Loading from 'components/Loading';
import GroupButton from 'components/GroupButton';
import React, { FC } from 'react';
import styles from './Check.module.scss';

interface ICheckProps {
  selected: boolean;
  check: ICheck;
  onSelect: (answer: string, checkId: string) => void;
  onMouseOver: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const YES = 'Yes';
const NO = 'No';

const Check: FC<ICheckProps> = (props) => {
  const { check, onSelect, selected = false, onMouseOver } = props;

  const onSelectCheck = (selectedAnswer: string) => {
    if (selectedAnswer === YES) {
      onSelect(YES, check.id);
    } else {
      onSelect(NO, check.id);
    }
  };

  return (
    <div
      onMouseOver={onMouseOver}
      className={`${styles.root} ${check.isDisabled && styles.disabled} ${
        selected && styles.selected
      }`}
      key={check.id}
    >
      <div className={styles.desc}>{check.description}</div>
      <GroupButton
        selectedBtnWithKeyboard={
          check.answer === YES ? 'left' : check.answer === NO ? 'right' : ''
        }
        disabled={check.isDisabled}
        leftBtnTitle={YES}
        rightBtnTitle={NO}
        onClick={onSelectCheck}
      />
    </div>
  );
};

export default Check;
