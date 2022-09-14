import { createApi} from "@reduxjs/toolkit/query/react";
import  {querySetups} from './index';

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: querySetups,
  tagTypes : ["USERS"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users`,
      transformResponse :(response)=>{
        return response.result;
      },
      providesTags : (response)=>{
        console.log(response);
        const finaldata = response.map((row)=> {
          return  {type : "USERS", id: row._id, email : row.email , firstName : row.firstName}
           })
         
        return  [...finaldata,{type :"USERS", id :"USERS", email :"", firstName :""}];
      }
    }),
    createUser  :builder.mutation({
      query:(data)=>{
         return { 
          url: 'user',
          method :"POST",
          body : data
         }
      },
      invalidatesTags : [{type :"USERS", id :"USERS"}]

    }),
    updateUser : builder.mutation({
      query : (data)=> {
        return  {
           url : `user/${data.id}`,
           method:'PUT',
          body: {email : data.email ,firstName : data.firstName}
        }
      },
      transformResponse :(response )=>{
        return response 
      },
      invalidatesTags : [{type :"USERS", id :"USERS"}]
    }),
    deleteUser :builder.mutation({
      query : (id)=>({
        url: `user/${id}`,
        method:"DELETE"
      }),
      transformResponse :(response)=>{
        return response;
      },
      invalidatesTags : [{type :"USERS", id :"USERS"}]
    })
  }),
});


export const { useGetUsersQuery, useCreateUserMutation , useUpdateUserMutation , useDeleteUserMutation } = usersApi;