import { Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import { FC, memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/store';
import { TasksActions } from 'src/store/task/dispatchers';
import { selectSentTasks } from 'src/store/task/selectors';
import { useSearchParams } from 'react-router-dom';
import { SentTask, Task } from 'src/models/task';

import styles from './TaskList.module.css';

const isSent = (t: SentTask) => t.sentAt != null;

const TaskListComponent: FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectSentTasks);
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

  if (tasks.length === 0) {
    return <h1>Please select a group!</h1>;
  }

  return <div className={styles['task-list']}>
    <h1>Group 01</h1>
    {tasks.map(task => <div className={styles['task-list__task']} key={task.id}>
      <span className={styles['task-list__task-title']}>{task.name}</span>
      <Fab onClick={() => sendTaskHandler(task.id)} color='primary' disabled={isSent(task)}>
        {isSent(task) ? <CheckIcon /> : <SendIcon />}
      </Fab>
    </div>)}
  </div>;
};

export const TaskList = memo(TaskListComponent);
