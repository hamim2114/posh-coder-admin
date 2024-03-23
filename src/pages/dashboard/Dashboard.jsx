import { useTheme } from '@emotion/react'
import { AutoAwesomeMotion, PeopleAlt, ShoppingCart, Workspaces } from '@mui/icons-material'
import { Avatar, Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import DataTable from '../../common/dataTable/DataTable'

const Dashboard = () => {
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:600px)')
  const cardStyle = {
    main: {
      width: matches ? '100%' : '280px',
      height: '100px',
      px: 5,
      border: '1px solid lightgray',
      borderRadius: '5px',
      // boxShadow: theme.shadow
    },
    icon: {
      bgcolor: theme.palette.primary.main,
      color: '#fff', p: 1, borderRadius: '50%',
      fontSize: '40px'
    }
  }

  return (
    <Box sx={{
      p: 5,
      // maxWidth: '1300px'
    }}>
      <Stack direction='row' flexWrap='wrap' gap={4}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={cardStyle.main}>
          <PeopleAlt sx={cardStyle.icon} />
          <Box>
            <Typography>Users</Typography>
            <Typography variant='h4'>100</Typography>
          </Box>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={cardStyle.main}>
          <ShoppingCart sx={cardStyle.icon} />
          <Box>
            <Typography>Orders</Typography>
            <Typography variant='h4'>10</Typography>
          </Box>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={cardStyle.main}>
          <AutoAwesomeMotion sx={cardStyle.icon} />
          <Box>
            <Typography>Services</Typography>
            <Typography variant='h4'>05</Typography>
          </Box>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={cardStyle.main}>
          <Workspaces sx={cardStyle.icon} />
          <Box>
            <Typography>Teams</Typography>
            <Typography variant='h4'>06</Typography>
          </Box>
        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} mt={8} gap={6}>
        <Box sx={{
          flex: 5
        }}>
          <Stack direction={'row'} justifyContent={'space-between'} mb={3}>
            <Typography variant='h5' color={'gray'}>Recent Order</Typography>
            <Button size='small' variant='contained'>View All</Button>
          </Stack>
          <Box>
            <DataTable />
          </Box>
        </Box>
        <Box sx={{
          flex: 1
        }}>
          <Typography variant='h5' color='gray'>Recent Customer</Typography>
          <Stack gap={3} mt={2}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((item, id) => (
                <Stack key={id} direction='row' gap={2} alignItems='center'>
                  <Avatar />
                  <Box>
                    <Typography sx={{ fontSize: '17px',color: 'gray' }}>John Abraham</Typography>
                    <Typography fontSize='14px'>Order: 2</Typography>
                  </Box>
                </Stack>
              ))
            }
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Dashboard
