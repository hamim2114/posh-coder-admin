import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosReq } from '../../utils/axiosReq';

const UserDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // Fetch user details
  const { isLoading: userLoading, error: userError, data: userData } = useQuery({
    queryKey: ['userDetails', id],
    queryFn: () => axiosReq.get(`/auth/user/${id}`).then(res => res.data)
  });

  // Fetch user orders, but only once userData is available
  const { isLoading: userOrderLoading, error: userOrderError, data: userOrder } = useQuery({
    queryKey: ['userOrders', id],
    queryFn: () => axiosReq.get(`/order/userOrder/${userData?._id}`).then(res => res.data),
    enabled: !!userData?._id, // Only run this query if userData is available
  });

  console.log('userOrder', userOrder)
  // console.log('userdetails', userData)
  return (
    <div>UserDetails</div>
  )
}

export default UserDetails