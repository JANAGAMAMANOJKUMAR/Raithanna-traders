import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/orders');  // API endpoint for admin orders
        setOrders(data);
        setError('');
      } catch {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  // Filter orders based on search input (case-insensitive search on user name or email)
  const filteredOrders = orders.filter(order => {
    const userName = order.user?.name?.toLowerCase() || '';
    const userEmail = order.user?.email?.toLowerCase() || '';
    const searchText = search.toLowerCase();
    return userName.includes(searchText) || userEmail.includes(searchText);
  });

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-4">
      <h2>Admin • Orders</h2>

      {/* Search bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by user name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Shipping Address</th>
            <th>Total Price</th>
            <th>Payment Method</th>
            <th>Paid</th>
            <th>Paid At</th>
            <th>Delivered</th>
            <th>Delivered At</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">No orders found.</td>
            </tr>
          ) : (
            filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name} ({order.user?.email})</td>
                <td>
                  {order.shippingAddress?.fullName}<br />
                  {order.shippingAddress?.phone}<br />
                  {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                </td>
                <td>₹{order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.isPaid ? 'Yes' : 'No'}</td>
                <td>{order.paidAt ? new Date(order.paidAt).toLocaleString() : '-'}</td>
                <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                <td>{order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
