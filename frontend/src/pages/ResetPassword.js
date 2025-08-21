import React, { useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, { password });
      setDone(data.message);
    } catch (err) {
      setDone(err?.response?.data?.message || "Invalid or expired link.");
    }
  };

  return (
    <div className="container py-5" style={{maxWidth: 480}}>
      <h3>Reset Password</h3>
      {done ? (
        <div>
          <div className="alert alert-info">{done}</div>
          <Link to="/login" className="btn btn-success">Back to Login</Link>
        </div>
      ) : (
        <form className="card p-3" onSubmit={submit}>
          <label className="mb-1">
            New Password <span style={{color:'red'}}>*</span>
          </label>
          <input
            className="form-control mb-2"
            type="password"
            required
            placeholder="Enter new password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
          <button className="btn btn-success" type="submit">Update Password</button>
        </form>
      )}
    </div>
  );
}
