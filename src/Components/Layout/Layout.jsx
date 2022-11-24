import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({ userData, logOut }) {
  return (
    <div className="lay">
      <Navbar userData={userData} logOut={logOut} />
      <div className="container">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}
