import React, { useState } from 'react';
import api from '../api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/forgot-password', { email });
    setSent(data.message + (data.resetUrl ? ` (Demo: ${data.resetUrl})` : ''));
  };

  return (
    <div className="container py-5" style={{maxWidth: 480}}>
      <h3>Forgot Password</h3>
      {sent ? (
        <div className="alert alert-info">{sent}</div>
      ) : (
        <form className="card p-3" onSubmit={submit}>
          <label className="mb-1">
            Email <span style={{color:'red'}}>*</span>
          </label>
          <input
            className="form-control mb-2"
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
          <button className="btn btn-success" type="submit">Send reset link</button>
        </form>
      )}
    </div>
  );
}
