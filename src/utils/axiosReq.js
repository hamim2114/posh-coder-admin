import axios from 'axios'

export const axiosReq = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://posh-coder-server.vercel.app/api',
  withCredentials: true
})