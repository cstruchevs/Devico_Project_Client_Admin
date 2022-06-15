import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { FC, memo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LogoBoxStyled,
  TopMenuStackStyled,
  WrapperBoxStyled,
  BottomMenuStackStyled,
} from './SideBarAdminStyles'
import { upSidebarLinks, downSidebarLinks } from './SideBarAdminLinks'
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { uiActions } from '../../store/ui-slice'

interface ISidebarAdmin {}

const SideBarAdmin: FC<ISidebarAdmin> = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logOutUser = useCallback(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    dispatch(authActions.logOutUser())
    dispatch(uiActions.toggleLoginForm())
  }, [dispatch])

  const changePassword = useCallback(() => {
    dispatch(uiActions.toggleChangePass())
  }, [dispatch])

  return (
    <Box sx={{ position: 'fixed' }}>
      <WrapperBoxStyled>
        <LogoBoxStyled>
          <Typography variant="h6">LOGO</Typography>
        </LogoBoxStyled>
        <TopMenuStackStyled>
          <List>
            {upSidebarLinks.map((item, index) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton onClick={() => navigate(item.link)}>
                  <item.icon />
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </TopMenuStackStyled>
        <BottomMenuStackStyled>
          <List>
            <ListItem key='Change Password' disablePadding>
              <ListItemButton onClick={changePassword}>
                <LockIcon/>
                <ListItemText primary='Change Password' />
              </ListItemButton>
            </ListItem>
            <ListItem key='Sign Out' disablePadding>
              <ListItemButton onClick={logOutUser}>
                <LogoutIcon/>
                <ListItemText primary='Sign Out' />
              </ListItemButton>
            </ListItem>
          </List>
        </BottomMenuStackStyled>
      </WrapperBoxStyled>
    </Box>
  )
}

export default memo(SideBarAdmin)
