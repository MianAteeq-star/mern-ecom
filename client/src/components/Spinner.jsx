import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import { useNavigate } from 'react-router-dom'

function Spinner() {
    const [count,setCount] = useState(3)
    const navigate = useNavigate()

    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((pre)=> -- pre)
        }, 1000);
       count ===0 && navigate('/login')
        return ()=> clearInterval(interval)
    },[count,navigate])
  return (
    <Layout title={"Spinner - Ecommerce App"}>
 <div className="flex items-center justify-center h-screen gap-4">
  <div className='text-3xl' >
   Go to Login page in  {count} seconds
  </div>
  <div className="relative">
    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
    </div>
  </div>
</div>

    </Layout>
  )

}

export default Spinner