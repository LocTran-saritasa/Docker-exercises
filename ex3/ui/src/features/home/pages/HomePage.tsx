import { memo, FC } from 'react';

import styles from './HomePage.module.css';
import { GroupList } from '../components/GroupList/GroupList';
import TaskList from '../components/TaskList';

const HomePageComponent: FC = () => (
  <div className={styles['homepage-container']}>
    <GroupList />
    <TaskList />
  </div>
);

export const HomePage = memo(HomePageComponent);
