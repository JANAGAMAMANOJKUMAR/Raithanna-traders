import React, { useState } from 'react';
import api from '../api';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', contact: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { signin } = useStore();
  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(form.contact) && !isValidPhone(form.contact)) {
      setError('Please enter a valid email or 10-digit phone number');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await api.post('/auth/register', {
        name: form.name,
        contact: form.contact,
        password: form.password,
      });
      signin({ _id: data._id, name: data.name, email: data.email, phone: data.phone, isAdmin: data.isAdmin }, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '480px' }}>
      <h3>Register</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="card p-3">
        <label className="mb-1">
          Name <span style={{ color: 'red' }}>*</span>
        </label>
        <input type="text" className="form-control mb-2" value={form.name} required onChange={e => setForm({ ...form, name: e.target.value })} />
        <label className="mb-1">
          Email or Phone <span style={{ color: 'red' }}>*</span>
        </label>
        <input type="text" className="form-control mb-2" value={form.contact} placeholder="Email or 10-digit phone" required onChange={e => setForm({ ...form, contact: e.target.value })} />
        <label className="mb-1">
          Password <span style={{ color: 'red' }}>*</span>
        </label>
        <input type="password" className="form-control mb-2" value={form.password} required onChange={e => setForm({ ...form, password: e.target.value })} />
        <label className="mb-1">
          Confirm Password <span style={{ color: 'red' }}>*</span>
        </label>
        <input type="password" className="form-control mb-2" value={form.confirmPassword} required onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
        <button type="submit" className="btn btn-success w-100">Create account</button>
      </form>
      <p className="mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
