import React, { useState } from 'react';

export default function CustomerForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const submit = e => {
    e.preventDefault();
    if (!form.name) return alert('Name required');
    onAdd(form);
    setForm({ name: '', phone: '', address: '' });
  };

  return (
    <form onSubmit={submit} className="card p-3 mb-4">
      <h5 className="mb-3">Add Customer</h5>
      <div className="mb-2">
        <input className="form-control" placeholder="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="mb-2">
        <input className="form-control" placeholder="Phone" value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div className="mb-2">
        <input className="form-control" placeholder="Address" value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })} />
      </div>
      <button className="btn btn-success" type="submit">Add Customer</button>
    </form>
  );
}
