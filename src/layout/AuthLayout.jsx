import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div >
      <div className="max-w-xl mx-auto my-10 shadow px-6 py-10 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
}
