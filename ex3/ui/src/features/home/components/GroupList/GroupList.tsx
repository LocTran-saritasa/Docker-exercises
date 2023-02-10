import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { FC, memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupsActions } from 'src/store/groups/dispatchers';
import { selectGroups } from 'src/store/groups/selectors';
import style from './GroupList.module.css'

const GroupListComponent: FC = () => {
  const dispatch = useAppDispatch()
  const { groups, isLoading } = useAppSelector(state => state.groups);

  useEffect(() => {
    dispatch(GroupsActions.get())
    return () => {
      dispatch(GroupsActions.cancelGet())
    }
  }, [dispatch])

  return (
    <Box className={style['group-list']}>
      <nav aria-label="main mailbox folders">
        <List>
          {
            groups.map(group => <ListItem disablePadding key={group.name}>
              <ListItemButton>
                <ListItemText disableTypography className={style['group-list__text']} primary={group.name} />
              </ListItemButton>
            </ListItem>)
          }
        </List>
      </nav>
    </Box>
  )
}

export const GroupList = memo(GroupListComponent);
