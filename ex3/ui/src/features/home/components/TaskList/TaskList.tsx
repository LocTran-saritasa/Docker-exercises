import { Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { FC, memo, useEffect } from 'react';
import styles from './TaskList.module.css';
import { useAppDispatch, useAppSelector } from 'src/store';
import { TasksActions } from 'src/store/task/dispatchers';
import { selectSentTasks } from 'src/store/task/selectors';
import { useSearchParams } from 'react-router-dom';

const TaskListComponent: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectSentTasks);

  useEffect(() => {
    const groupId = Number.parseInt(searchParams.get('group') ?? '');
    if (!Number.isNaN(groupId)) {
      dispatch(TasksActions.getByGroupId(groupId));
    }
    return () => {
      dispatch(TasksActions.cancelGet());
    }
  }, [searchParams])

  return <div className={styles['task-list']}>
    <h1>Group 01</h1>
    {tasks.map(task => <div className={styles['task-list__task']} key={task.id}>
      <span className={styles['task-list__task-title']}>{task.name}</span>
      <Fab color='primary' disabled={task.groupId == null}><SendIcon /></Fab>
    </div>
    )}
  </div>
}

export const TaskList = memo(TaskListComponent)
