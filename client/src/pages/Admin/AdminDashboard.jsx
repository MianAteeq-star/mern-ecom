import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import AdminMenu from '../../components/Layout/AdminMenu';

function AdminDashboard() {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="flex "> {/* Enable flexbox for side-by-side layout */}
      <div className="w-4/12  flex justify-center items-center flex-col gap-4 p-4">  
      <h3 className='text-3xl'>Admin Dashboard</h3> 
         <AdminMenu/>
        </div>
        <div className="w-8/12 bg-amber-700 p-4"> {/* Remaining 8 cols */}
        <h3> Admin Name : {auth?.user?.name}</h3>
              <h3> Admin Email : {auth?.user?.email}</h3>
              <h3> Admin Contact : {auth?.user?.phone}</h3>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
