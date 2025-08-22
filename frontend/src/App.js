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
import AdminOrders from './pages/AdminOrders';  // Import admin orders page
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import ForgotPassword from './pages/ForgotPassword';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';

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
        <div className="d-flex flex-column min-vh-100">
          <Navbar />

          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
              <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/shipping" element={<PrivateRoute><Shipping /></PrivateRoute>} />
              <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
              <Route path="/placeorder" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
