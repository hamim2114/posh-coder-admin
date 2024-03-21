/* eslint-disable react/prop-types */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';

export default function CDialog({openDialog , handleDialogClose, children}) {
  // const [openDialog, setOpenDialog] = React.useState(false);

  // const handleDialogOpen = () => {
  //     setOpenDialog(true);
  // };

  // const handleDialogClose = () => {
  //     setOpenDialog(false);
  // };

  return (
    <React.Fragment>
      <Dialog open={openDialog} onClose={handleDialogClose}
      >
        <Box sx={{
          py: 2,px: 3,
          width: {xm: '300px',md: '500px'},
          // height: '400px'
        }}>

        {children}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}