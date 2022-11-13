import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const querySetups = fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
    keepalive: 60,
    credentials: 'include'
});
