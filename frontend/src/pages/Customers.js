import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerForm from '../components/CustomerForm';

const API = process.env.REACT_APP_API_URL;

export default function Customers(){
  const [customers, setCustomers] = useState([]);

  useEffect(() => { fetchCustomers(); }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API}/customers`);
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch customers');
    }
  };

  const addCustomer = async (data) => {
    try {
      const res = await axios.post(`${API}/customers`, data);
      setCustomers(prev => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      alert('Failed to add customer');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Customers</h2>
      <CustomerForm onAdd={addCustomer} />

      <div className="card p-3">
        <h5 className="mb-3">Customer List</h5>
        {customers.length === 0 ? <p className="text-muted">No customers yet.</p> : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead><tr><th>Name</th><th>Phone</th><th>Address</th></tr></thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.phone}</td>
                    <td>{c.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
