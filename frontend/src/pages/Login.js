import React, { useState } from 'react';
import api from '../api';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const { signin } = useStore();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      signin({ _id: data._id, name: data.name, email: data.email, isAdmin: data.isAdmin }, data.token);
      nav('/');
    } catch (e) {
      alert(e?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container py-5" style={{maxWidth: 480}}>
      <h3>Login</h3>
      <form onSubmit={submit} className="card p-3">
        <label className="mb-1">
          Email <span style={{color:'red'}}>*</span>
        </label>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          type="email"
          required
          onChange={e=>setForm({...form, email:e.target.value})}
        />
        <label className="mb-1">
          Password <span style={{color:'red'}}>*</span>
        </label>
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={e=>setForm({...form, password:e.target.value})}
        />
        <button className="btn btn-success">Login</button>
      </form>
      <p className="mt-2">
        <Link to="/forgot-password">Forgot password?</Link>
      </p>

      <p className="mt-2">
        No account? <Link to="/register">Register</Link>
      </p>
      {/*<p className="text-muted small mt-2">Admin: admin@raithanna.com / Admin@123</p>*/}

    </div>
  );
}
