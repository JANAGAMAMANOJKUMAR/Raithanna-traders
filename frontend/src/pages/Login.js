import React, { useState } from 'react';
import api from '../api';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ contact: '', password: '' });
  const [error, setError] = useState('');
  const { signin } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      signin({ _id: data._id, name: data.name, email: data.email, phone: data.phone, isAdmin: data.isAdmin }, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '480px' }}>
      <h3>Login</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="card p-3">
        <label className="mb-1">
          Email or Phone <span style={{ color: 'red' }}>*</span>
        </label>
        <input type="text" className="form-control mb-2" value={form.contact} placeholder="Email or 10-digit phone" required onChange={e => setForm({ ...form, contact: e.target.value })} />
        <label className="mb-1">
          Password <span style={{ color: 'red' }}>*</span>
        </label>
        <input type="password" className="form-control mb-2" value={form.password} required onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
      <p className="mt-2">
        <Link to="/forgot-password">Forgot password?</Link>
      </p>

      <p className="mt-2">
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
