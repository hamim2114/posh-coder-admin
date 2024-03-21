import { DeleteForever, DoneAll, Edit } from '@mui/icons-material'
import { Box, Button, DialogActions, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import CDialog from '../../../common/dialog/CDialog';
import WebPackageEdit from './WebPackageEdit';

const WebPackage = ({data}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDialogOpen = () => {
      setOpenDialog(true);
  };

  const handleDialogClose = () => {
      setOpenDialog(false);
  };
  const handleDeleteDialogOpen = () => {
      setOpenDeleteDialog(true)
  };
  const handleDeleteDialogClose = () => {
      setOpenDeleteDialog(false)
  }

  return (
    <Stack sx={{
      textAlign: 'center',
      gap: 2
    }}>
      <Typography variant='h4' sx={{ fontSize: '30px' }}>{data.name}</Typography>
      <Typography variant='h5' sx={{ fontWeight: 300 }}>{data.price}</Typography>
      <Box>
        {
          data?.info.map((d, i) => (
            <Stack key={i} direction='row' gap={2} mb={1}>
              <DoneAll sx={{ color: 'gray' }} />
              <Typography>{d}</Typography>
            </Stack>
          ))
        }
      </Box>
      <Stack direction={'row'} gap={2}>
        <Button size='small' onClick={handleDialogOpen} sx={{ flexGrow: 1 }} variant='outlined' startIcon={<Edit />}>Edit</Button>
        <Button onClick={handleDeleteDialogOpen} size='small' variant='contained'><DeleteForever /></Button>
      </Stack>
      {/* delete dialog */}
      <CDialog openDialog={openDeleteDialog} handleDialogClose={handleDeleteDialogClose}>
        <Typography variant='h5' color='gray' mb={2}>Confirm Delete?</Typography>
        <DialogActions>
          <Button size='small' variant='contained'>Ok</Button>
          <Button size='small' variant='outlined' onClick={handleDeleteDialogClose}>Cancel</Button>
        </DialogActions>
      </CDialog>
      {/* edit dialog  */}
      <CDialog openDialog={openDialog}>
        <WebPackageEdit data={data} />
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </CDialog>
    </Stack>
  )
}

export default WebPackage
