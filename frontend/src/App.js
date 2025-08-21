import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StoreProvider, { useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminProducts from './pages/AdminProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
function PrivateRoute({ children }) {
  const { user } = useStore();
  return user ? children : <Navigate to="/login" replace />;
}
function AdminRoute({ children }) {
  const { user } = useStore();
  return user?.isAdmin ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        {/* 👇 Flex column ensures footer sticks to bottom */}
        <div className="d-flex flex-column min-vh-100">
          <Navbar />

          {/* 👇 main content grows, pushing footer down */}
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={<PrivateRoute><Checkout /></PrivateRoute>}
              />
              <Route
                path="/orders"
                element={<PrivateRoute><Orders /></PrivateRoute>}
              />
              <Route
                path="/admin/products"
                element={<AdminRoute><AdminProducts /></AdminRoute>}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
