import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

function Dashboard() {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
        
      <div className="flex "> 
        <div className="w-4/12  flex justify-center items-center flex-col gap-4 p-4">  {/* 4 cols out of 12 */}
      <h3 className='text-3xl'>User Dashboard</h3>
         <UserMenu/>
        </div>
        <div className="w-8/12 bg-amber-700 p-4"> {/* Remaining 8 cols */}
        <h3> User Name : {auth?.user?.name}</h3>
              <h3> User Email : {auth?.user?.email}</h3>
              <h3> User Contact : {auth?.user?.phone}</h3>
        </div>
      </div>
    </Layout>
    
  )
}

export default Dashboard