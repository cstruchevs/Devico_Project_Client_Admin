import { Badge, Typography } from '@mui/material'
import {
  StyledMenuBoxNav,
  StyledAppBar,
  StyledInnerWarapperBox,
  StyledAuthStack,
  StyledNotificationDivider,
  StyledAuthStackWrapper,
  StyledOuterWarapperBox,
  StyledPageTitle,
  StyledAuthBoxIconWrapper,
} from './TopNavbarStyles'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import React, { FC, memo, useCallback, useState } from 'react'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { INotifications } from '../../store/notifications'
import Notifications from './Notifications/Notifications'

interface ITopNavbar {}

const TopNavbar: FC<ITopNavbar> = () => {
  let locationPathName = useLocation().pathname

  let locationResultPath = ''
  let n = locationPathName.lastIndexOf('/')
  locationPathName = locationPathName.substring(n + 1)
  locationResultPath = locationPathName.charAt(0).toUpperCase() + locationPathName.slice(1)

  const notifications = useSelector<RootState, INotifications[]>(
    state => state.notifications.notifications,
  )

  const [anchorElNotification, setAnchorElNotification] = useState<SVGSVGElement | null>(null)

  const handleClickNotification = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorElNotification(event.currentTarget)
  }

  const handleCloseNotification = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorElNotification(null)
  }

  const openNotification = Boolean(anchorElNotification)
  const idNotification = openNotification ? 'simple-popover' : undefined

  return (
    <StyledOuterWarapperBox>
      <StyledAppBar>
        <StyledInnerWarapperBox>
          <StyledPageTitle>{locationResultPath}</StyledPageTitle>
          <StyledMenuBoxNav pr={1} pl={1}>
            <StyledAuthStackWrapper gap={1.5}>
              <StyledAuthBoxIconWrapper>
                <Badge color="secondary" badgeContent={notifications.length}>
                  <NotificationsNoneOutlinedIcon
                    aria-describedby={idNotification}
                    onClick={handleClickNotification}
                  />
                </Badge>
              </StyledAuthBoxIconWrapper>
              <Notifications
                idNotification={idNotification}
                openNotification={openNotification}
                anchorElNotification={anchorElNotification}
                handleCloseNotification={handleCloseNotification}
              />
              <StyledNotificationDivider orientation="vertical" />
              <StyledAuthStack>
                <Typography sx={{ fontSize: '13px' }}>Welcome! </Typography>
              </StyledAuthStack>
            </StyledAuthStackWrapper>
          </StyledMenuBoxNav>
        </StyledInnerWarapperBox>
      </StyledAppBar>
    </StyledOuterWarapperBox>
  )
}

export default TopNavbar
