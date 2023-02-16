import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { FC, memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Group } from 'src/models/group';
import { useAppDispatch, useAppSelector } from 'src/store';
import { GroupsActions } from 'src/store/groups/dispatchers';
import { selectGroups } from 'src/store/groups/selectors';
import style from './GroupList.module.css'

const GroupListComponent: FC = () => {
  const dispatch = useAppDispatch()
  const { groups, isLoading } = useAppSelector(state => state.groups);

  const [getSearchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(GroupsActions.get())
    return () => {
      dispatch(GroupsActions.cancelGet())
    }
  }, [dispatch])

  const selectGroupHandler = (groupId: Group['id']) => {
    setSearchParams({
      group: groupId.toString(),
    })
  }

  return (
    <Box className={style['group-list']}>
      <nav aria-label="main mailbox folders">
        <List>
          {
            groups.map(group => <ListItem disablePadding key={group.name}>
              <ListItemButton onClick={() => selectGroupHandler(group.id)}>
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
