import { memo, FC } from 'react';

import styles from './HomePage.module.css';
import { GroupList } from '../components/GroupList';

const HomePageComponent: FC = () => (
  <GroupList />
);

export const HomePage = memo(HomePageComponent);
