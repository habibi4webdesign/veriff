import { FC, ReactNode } from 'react';
import styles from './MainLayout.module.scss';

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = (props) => {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
};

export default MainLayout;
