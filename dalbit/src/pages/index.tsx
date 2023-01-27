import { Inter } from '@next/font/google'
import { useEffect, useState } from 'react';
import Login from './Login'


const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const [aToken, setAToken ] = useState<account>("");
  useEffect(()=>{
    setAToken(localStorage.getItem("accessToken"));
  },[])

  return (
    <>
      <Login />
    </>
  )
}
