import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminCartOverview() {
  const [userCarts, setUserCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCarts() {
      setLoading(true);
      try {
        const { data } = await api.get('/admin/carts');
        setUserCarts(data);
      } catch {
        setError('Failed to load user carts.');
      }
      setLoading(false);
    }
    fetchCarts();
  }, []);

  if (loading) return <p>Loading user carts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-4">
      <h2>Admin • User Carts Overview</h2>
      {userCarts.length === 0 ? (
        <p>No carts found.</p>
      ) : (
        <ul>
          {userCarts.map(cart => (
            <li key={cart.id}>
              <strong>User:</strong> {cart.userName} ({cart.userEmail}) — <strong>Items:</strong> {cart.itemsCount}, <strong>Total Qty:</strong> {cart.totalQty}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
