import { Inter } from '@next/font/google'
import { useEffect, useState } from 'react';
import Login from './Login'

type account = string | null;

export default function Home() {
  const [aToken, setAToken ] = useState<account>("");
  useEffect(()=>{
    setAToken(localStorage.getItem("accessToken"));
  },[])

  console.log(aToken + "-Token")


  return (
    <>
      <Login />
    </>
  )
}
