import React, { useState } from 'react';
import api from '../api';

export default function ForgotPassword() {
  const [form, setForm] = useState({ contact: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!form.contact || !form.newPassword) {
      setError('All fields are required');
      return;
    }

    try {
      const { data } = await api.post('/auth/simple-reset', { contact: form.contact, newPassword: form.newPassword });
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 480 }}>
      <h3>Reset Password</h3>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="card p-3">
        <label>Email or Phone <span style={{color:'red'}}>*</span></label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Email or 10-digit phone"
          value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })}
          required
        />

        <label>New Password <span style={{color:'red'}}>*</span></label>
        <input
          type="password"
          className="form-control mb-2"
          value={form.newPassword}
          onChange={e => setForm({ ...form, newPassword: e.target.value })}
          required
        />

        <label>Confirm Password <span style={{color:'red'}}>*</span></label>
        <input
          type="password"
          className="form-control mb-2"
          value={form.confirmPassword}
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
          required
        />

        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
      </form>
    </div>
  );
}
