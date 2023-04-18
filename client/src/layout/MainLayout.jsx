import React from 'react'
import SideBar from '../components/sidebar/SideBar'
import Header from '../components/Header'

export default function MainLayout({children}) {
  return (
    <>
     <div className="home-container flex w-full h-screen">
      <div className="sidebar bg-primary w-[20%] min-w-[250px]">
        <SideBar />
      </div>
      <div className="main flex flex-col w-full mx-4">
        <Header />
        {children}
      </div>
    </div>
    </>
  )
}
