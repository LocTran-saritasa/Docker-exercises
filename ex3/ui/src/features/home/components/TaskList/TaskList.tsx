import { Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { FC, memo, useEffect } from 'react';
import styles from './TaskList.module.css';
import { useAppDispatch, useAppSelector } from 'src/store';
import { TasksActions } from 'src/store/task/dispatchers';
import { selectTasks } from 'src/store/task/selectors';

const TaskListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(TasksActions.get());
    return () => {
      dispatch(TasksActions.cancelGet());
    }
  }, [])

  return <div className={styles['task-list']}>
    <h1>Group 01</h1>
    {tasks.map(task => <div className={styles['task-list__task']} key={task.name}>
      <span className={styles['task-list__task-title']}>{task.name}</span>
      <Fab color='primary'><SendIcon /></Fab>
    </div>
    )}
  </div>
}

export const TaskList = memo(TaskListComponent)
