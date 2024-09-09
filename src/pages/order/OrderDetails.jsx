import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosReq } from '../../utils/axiosReq';
import { Box, Card, CardContent, Chip, Grid, IconButton, Stack, Typography } from '@mui/material';
import Loader from '../../common/Loader';
import ErrorMsg from '../../common/ErrorMsg';
import CButton from '../../common/CButton';
import CDialog from '../../common/dialog/CDialog';
import UpdateOrder from './UpdateOrder';
import { ArrowBack } from '@mui/icons-material';

const OrderDetails = () => {
  const [orderUpdateDialogOpen, setOrderUpdateDialogOpen] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()
  const { isLoading, error, data } = useQuery({
    queryKey: ['orderDetails', id],
    queryFn: () => axiosReq.get(`/order/order/${id}`).then(res => res.data)
  });

  function handleEdit(row) {
    setOrderUpdateDialogOpen(true)
  }


  console.log(data)

  return (
    <Box>
      {
        isLoading ? <Loader /> : error ? <ErrorMsg /> :
          <Card sx={{ maxWidth: 800, width: '100%', p: 2 }}>
            <CardContent>
              <Stack direction='row' gap={2} alignItems='center'>
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Order Details
                </Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between'>
                <Box />
                <CButton disable={data?.status === 'delivered' || data?.status === 'cancelled'} onClick={() => setOrderUpdateDialogOpen(true)} variant='contained'>Update</CButton>
              </Stack>
              {/* update Order */}
              <CDialog maxWidth='md' onClose={() => setOrderUpdateDialogOpen(false)} openDialog={orderUpdateDialogOpen}>
                <UpdateOrder data={data} closeDialog={() => setOrderUpdateDialogOpen(false)} />
              </CDialog>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Order ID:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {data?._id}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Order Name:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {data?.orderName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Customer Name:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {data?.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Email:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {data?.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Phone:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {data?.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Status:
                  </Typography>
                  <Box sx={{
                    display: 'inline-flex',
                    padding: '5px 12px',
                    bgcolor: data?.status === 'cancelled'
                      ? 'red'
                      : data?.status === 'confirmed'
                        ? '#386FA8'
                        : data?.status === 'delivered'
                          ? 'green'
                          : data?.status === 'processing'
                            ? '#419BD2'
                            : 'purple',
                    color: '#fff',
                    borderRadius: '50px',
                  }}>
                    <Typography sx={{ fontWeight: 600, textAlign: 'center' }} variant='body2'>{data?.status}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} >
                  <Typography variant="subtitle1" color="text.secondary">
                    Description:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {data?.desc}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ border: '1px solid lightgray', p: 2, borderRadius: '8px' }} mt={2}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Admin Note:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {data?.note}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Created At:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {new Date(data?.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Updated At:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {new Date(data?.updatedAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
      }
    </Box>
  )
}

export default OrderDetails