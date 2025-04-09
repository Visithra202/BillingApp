import React from 'react'
import AppRoutes from '../AppRoutes'
import { useNavigate } from 'react-router-dom'

export default function Main_bar({setLogin}) {
  const navigate=useNavigate();

  return (
    <>
      <div className='navbar d-flex justify-content-between' style={{ backgroundColor: 'white' }}>
        <div></div>
        <div>
          <button className='btn btn-primary rounded-pill px-3 py-1 mx-1'><i className="bi bi-plus-circle me-1"></i>Add sale</button>
          <button className='btn btn-danger rounded-pill px-3 py-1 mx-1' onClick={()=>setLogin(false)}>Logout</button>
        </div>
      </div>

      <div>
        <AppRoutes />
      </div>
    </>
  )
}
