import { FC, memo } from 'react';
import styles from './TaskList.module.css';

const TaskListComponent: FC = () => {
  return <div className={styles['task-list']}>
    <h1>Group 01</h1>
    {['Vocabulary1', 'Vocabulary2', 'Vocabulary3'].map(name =>
      <span className={styles['task-list__task']} key={name}>{name}</span>
    )}
  </div>
}

export const TaskList = memo(TaskListComponent)
