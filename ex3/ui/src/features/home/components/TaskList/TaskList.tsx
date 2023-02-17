import { CircularProgress, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import { FC, memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/store';
import { TasksActions } from 'src/store/task/dispatchers';
import { useSearchParams } from 'react-router-dom';
import { SentTask, Task } from 'src/models/task';

import styles from './TaskList.module.css';

const isSent = (t: SentTask) => t.sentAt != null;

const TaskListComponent: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { sentTasks, isLoading, error } = useAppSelector(state => state.tasks);
  const groupId = Number.parseInt(searchParams.get('group') ?? '', 10);

  useEffect(() => {
    if (!Number.isNaN(groupId)) {
      dispatch(TasksActions.getByGroupId(groupId));
    }
    return () => {
      dispatch(TasksActions.cancelGet());
    };
  }, [groupId, dispatch]);

  const sendTaskHandler = (taskId: Task['id']) => dispatch(TasksActions.sendTask({
    groupId,
    taskId,
  }));

  if (isNaN(groupId)) {
    return <h1 className={styles['task-list__message']}>Please select a group!</h1>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1 className={styles['task-list__error']}>{error.message}</h1>;
  }

  if (sentTasks.length === 0) {
    return <h1 className={styles['task-list__message']}>You do not have any tasks!</h1>;
  }

  return <div className={styles['task-list']}>
    {sentTasks.map(task => <div className={styles['task-list__task']} key={task.id}>
      <span className={styles['task-list__task-title']}>{task.name}</span>
      <Fab onClick={() => sendTaskHandler(task.id)} color='primary' disabled={isSent(task)}>
        {isSent(task) ? <CheckIcon /> : <SendIcon />}
      </Fab>
    </div>)}
  </div>;
};

export const TaskList = memo(TaskListComponent);
