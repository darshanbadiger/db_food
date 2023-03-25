import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }




  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="/">db Foods</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span classNameName="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>

              {
                (localStorage.getItem("authToken")
                  ? <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                  </li>
                  : "")
              }

            </ul>

            {
                (!localStorage.getItem("authToken")?
            <div className='d-flex'>
              <Link className="btn bg-primary mx-1 text-white" to="/login">Login</Link>
              <Link className="btn bg-primary mx-1 text-white" to="/createuser">Signup</Link>
            </div>
            :   <div>
            <div className='btn bg-primary mx-1 text-white'>MyCart</div>
            <div className='btn btn-outline-primary mx-1' onClick={handleLogout}>Logout</div>
            </div>
            )
              }
          </div>
        </div>
      </nav>
    </div>
  );
}
