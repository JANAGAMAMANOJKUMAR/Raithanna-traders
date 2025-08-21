import React, { useState } from 'react';
import api from '../api';
import { useStore } from '../context/StoreContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const { signin } = useStore();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      signin({ _id: data._id, name: data.name, email: data.email, isAdmin: data.isAdmin }, data.token);
      nav('/');
    } catch (e) {
      alert(e?.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="container py-5" style={{maxWidth: 480}}>
      <h3>Register</h3>
      <form onSubmit={submit} className="card p-3">
        <label className="mb-1">
          Name <span style={{color:'red'}}>*</span>
        </label>
        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          required
          onChange={e=>setForm({...form, name:e.target.value})}
        />
        <label className="mb-1">
          Email <span style={{color:'red'}}>*</span>
        </label>
        <input
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          value={form.email}
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
        <button className="btn btn-success">Create account</button>
      </form>
      <p className="mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
