import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { user, signout, cart } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">Raithanna Traders</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>

            {user?.isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/products">Admin Products</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/orders">User Orders</NavLink>
                </li>
              </>
            )}

            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/orders">My Orders</NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/cart">
                Cart ({cart.reduce((s, i) => s + i.qty, 0)})
              </NavLink>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item d-flex align-items-center">
                <span className="me-2">Hi, {user.name}</span>
                <button className="btn btn-outline-success btn-sm" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
