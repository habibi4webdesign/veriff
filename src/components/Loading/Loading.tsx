import React, { FC } from 'react';
//styles
import style from './Loading.module.scss';

interface ILoadingProps {
  isComponentLoading?: boolean;
}

const Loading: FC<ILoadingProps> = (props) => {
  const { isComponentLoading = false } = props;
  return (
    <div
      className={`${
        isComponentLoading
          ? style.componentLoadingContainer
          : style.globalLoadingContainer
      }`}
    >
      <div className={style.spinner}>
        <div className={style.spinnerItem}></div>
        <div className={style.spinnerItem}></div>
        <div className={style.spinnerItem}></div>
      </div>
    </div>
  );
};

export default Loading;
