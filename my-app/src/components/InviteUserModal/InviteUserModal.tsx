import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { uiActions } from '../../store/ui-slice'
import { StyledTextField, StyledTypography } from './InviteUserModalStyles'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { Box } from '@mui/system'

interface IInviteUserModal {}

const InviteUserModal: FC<IInviteUserModal> = () => {
  const dispatch = useDispatch()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const users = useSelector((state: RootState) => state.users.users)
  const isShowInviteUsers = useSelector((state: RootState) => state.ui.showInviteUsers)

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  const handleClose = () => {
    dispatch(uiActions.toggleInviteUsers())
  }

  return (
    <Dialog open={isShowInviteUsers} onClose={handleClose}>
      <DialogTitle>Invite Users</DialogTitle>
      <Divider />
      <DialogContent>
        <StyledTypography>Email</StyledTypography>
        <Autocomplete
          multiple
          id="tags-filled"
          options={users.map(option => option.email)}
          freeSolo
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={params => <StyledTextField {...params} placeholder="Favorites" />}
        />
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Send Emails</Button>
      </DialogActions>
    </Dialog>
  )
}

export default InviteUserModal
