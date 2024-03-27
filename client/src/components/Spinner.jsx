import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function Spinner({path = "login"}) {
    const [count,setCount] = useState(3)
    const navigate = useNavigate()

    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((pre)=> -- pre)
        }, 1000);
       count ===0 && navigate(`/${path}`)
        return ()=> clearInterval(interval)
    },[count,navigate,path])
  return (
    <Layout title={"Spinner - Ecommerce App"}>
 <div className="flex items-center justify-center h-screen gap-4">
  <div className='text-2xl' >
   Go to Login page in  {count} seconds
  </div>
  <Spin
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 40,
        }}
        spin
      />
    }
  />



  </div>

    </Layout>
  )

}

export default Spinner