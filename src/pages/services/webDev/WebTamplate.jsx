import React, { useState } from 'react'
import { Box, Button, DialogActions, Stack, TextField, Typography } from '@mui/material'
import { Add, Close, FileUpload } from '@mui/icons-material';
import CDialog from '../../../common/dialog/CDialog';

const WebTamplate = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [file, setFile] = useState('')

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };
  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };
  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };
  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };
  return (
    <Box>
      <Button sx={{ mt: 3 }} onClick={handleAddDialogOpen} startIcon={<Add />} variant='contained'>Add</Button>
      <CDialog openDialog={openAddDialog}>
        <Stack gap={2} py={2}>
          <Stack direction='row' gap={2} alignItems='center'>
            <label style={{
              border: '1px solid lightgray',
              padding: '5px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              textAlign: 'center',
              display: 'inline-flex',
              width: 'fit-content'
            }} htmlFor="upload-file"><FileUpload />Image</label>
            <Stack direction='row' gap={1}>{file && file.name}{file && <Close sx={{ cursor: 'pointer' }} onClick={() => setFile('')} />}</Stack>
          </Stack>
          <input onChange={e => setFile(e.target.files[0])} type="file" name="" id="upload-file" accept='jpg,png' hidden />
          <TextField id="standard-basic" label="Tamplate Name" placeholder='e.g. Home Solutions Provider' variant="outlined" size='small' />
          <TextField id="standard-basic" label="Company Name" variant="outlined" placeholder='e.g. Digital Dreams Ltd' size='small' />
          <TextField id="standard-basic" label="Link" placeholder='e.g. https://demo.com' variant="outlined" size='small' />
        </Stack>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button variant='contained'>Done</Button>
        </DialogActions>
      </CDialog>
      {/* tamplate */}
      <Stack mt={7} direction={{ xs: 'column', md: 'row' }} flexWrap='wrap' gap={6}>
        <CDialog openDialog={openDeleteDialog} handleDialogClose={handleDeleteDialogClose}>
          <Typography variant='h5' color='gray' mb={2}>Confirm Delete?</Typography>
          <DialogActions>
            <Button size='small' variant='contained'>Done</Button>
            <Button size='small' variant='outlined' onClick={handleDeleteDialogClose}>Cancel</Button>
          </DialogActions>
        </CDialog>
        {
          [1, 2, 3, 4, 5, 6].map((item, id) => (
            <Box key={id} sx={{
              width: '250px',
            }}>
              <Button onClick={handleDeleteDialogOpen}>Remove</Button>
              <Box sx={{
                width: '100%',
                height: '350px'
              }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="/webT2.png" alt="" />
              </Box>
              <Typography variant='h5' mt={1}>Digital Dreams Ltd</Typography>
              <Typography variant='body2'>Home Solutions Provider</Typography>
              <Typography>https://demo.com</Typography>
            </Box>
          ))
        }
      </Stack>
    </Box>
  )
}

export default WebTamplate
