import { AutoAwesomeMotion, MenuBook, PeopleAlt, ShoppingCart, Workspaces } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import RecentOrder from './RecentOrder'
import RecentCustomer from './RecentCustomer'
import { Link } from 'react-router-dom'
import { axiosReq } from '../../utils/axiosReq'
import { useQuery } from '@tanstack/react-query'

const cardStyle = {
  main: {
    width: { xs: '100%', md: '300px' },
    maxWidth: { xs: '100%', sm: '300px' },
    height: '100px',
    px: 5,
    border: '1px solid lightgray',
    borderRadius: '5px',
  },
  icon: {
    bgcolor: 'primary.main',
    color: '#fff', p: 1, borderRadius: '50%',
    fontSize: '40px'
  }
}


const Dashboard = () => {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => axiosReq.get(`/auth/users`).then((res) => res.data)
  });
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => axiosReq.get(`/order/orders`).then((res) => res.data)
  });
  const { data: allTeams } = useQuery({
    queryKey: ['team'],
    queryFn: () => axiosReq.get('/team/allTeams').then(res => res.data)
  });
  const { data: allBlog } = useQuery({
    queryKey: ['blog'],
    queryFn: () => axiosReq.get('/blog/getAll').then(res => res.data)
  });

  return (
    <Box maxWidth='xl'>
      <Stack direction='row' flexWrap='wrap' gap={4} mt={4}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={cardStyle.main}>
          <PeopleAlt sx={cardStyle.icon} />
          <Box>
            <Typography>Users</Typography>
            <Typography variant='h4'>{users?.length}</Typography>
          </Box>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={cardStyle.main}>
          <ShoppingCart sx={cardStyle.icon} />
          <Box>
            <Typography>Orders</Typography>
            <Typography variant='h4'>{orders?.length}</Typography>
          </Box>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={cardStyle.main}>
          <Workspaces sx={cardStyle.icon} />
          <Box>
            <Typography>Teams</Typography>
            <Typography variant='h4'>{allTeams?.length}</Typography>
          </Box>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={cardStyle.main}>
          <MenuBook sx={cardStyle.icon} />
          <Box>
            <Typography>Blogs</Typography>
            <Typography variant='h4'>{allBlog?.length}</Typography>
          </Box>
        </Stack>
      </Stack>

      <Stack mt={8} gap={6}>
        <Box sx={{
          flex: 5
        }}>
          <Stack direction={'row'} justifyContent={'space-between'} mb={3}>
            <Typography variant='h5' color={'gray'}>Recent Order</Typography>
            <Link to='/admin/orders'>
              <Button size='small' variant='contained'>View All</Button>
            </Link>
          </Stack>
          <RecentOrder />
        </Box>
        <Box sx={{
          flex: 1
        }}>
          <Stack direction={'row'} justifyContent={'space-between'} mb={3}>
            <Typography variant='h5' color={'gray'}>Recent Customers</Typography>
            <Link to='/admin/users'>
              <Button size='small' variant='contained'>View All</Button>
            </Link>
          </Stack>
          <RecentCustomer />
        </Box>
      </Stack>
    </Box>
  )
}

export default Dashboard
