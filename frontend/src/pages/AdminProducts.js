import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    countInStock: '',
    category: '',
    brand: '',
    description: '',
    image: ''
  });
  const [editId, setEditId] = useState(null);  // track product being edited
  const [error, setError] = useState('');

  const load = async () => {
    const { data } = await api.get('/products');
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();

    try {
      setError('');
      const payload = {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock)
      };

      if (editId) {
        // Update existing product
        await api.put(`/products/${editId}`, payload);
      } else {
        // Create new product
        await api.post('/products', payload);
      }

      // Clear form and reset editing state
      setForm({
        name: '',
        price: '',
        countInStock: '',
        category: '',
        brand: '',
        description: '',
        image: ''
      });
      setEditId(null);

      // Reload product list
      load();
    } catch (err) {
      setError('Error saving product. Please try again.');
    }
  };

  // Load product details into form for editing
  const edit = (product) => {
    setForm({
      name: product.name || '',
      price: product.price || '',
      countInStock: product.countInStock || '',
      category: product.category || '',
      brand: product.brand || '',
      description: product.description || '',
      image: product.image || ''
    });
    setEditId(product._id);
  };

  const del = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await api.delete(`/products/${id}`);
      load();
      // If deleting the product being edited, reset form
      if (editId === id) {
        setEditId(null);
        setForm({
          name: '',
          price: '',
          countInStock: '',
          category: '',
          brand: '',
          description: '',
          image: ''
        });
      }
    }
  };

  return (
    <div className="container py-4">
      <h2>Admin • Products</h2>

      <form onSubmit={save} className="card p-3 mb-3">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-2">
          {['name', 'price', 'countInStock', 'category', 'brand', 'description', 'image'].map((k) => (
            <div key={k} className="col-md-4">
              <input
                className="form-control"
                placeholder={k}
                value={form[k] || ''}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              />
            </div>
          ))}

          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              {editId ? 'Update' : 'Add'}
            </button>
          </div>

          {editId && (
            <div className="col-md-2">
              <button
                className="btn btn-secondary w-100"
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm({
                    name: '',
                    price: '',
                    countInStock: '',
                    category: '',
                    brand: '',
                    description: '',
                    image: ''
                  });
                  setError('');
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>

      <div className="table-responsive card p-2">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Image</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.countInStock}</td>
                <td>{p.category}</td>
                <td>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => edit(p)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => del(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
