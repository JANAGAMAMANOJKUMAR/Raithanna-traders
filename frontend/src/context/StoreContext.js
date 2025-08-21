import React, { createContext, useContext, useMemo, useState } from 'react';

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

export default function StoreProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('rt_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [cart, setCart] = useState(() => {
    const raw = localStorage.getItem('rt_cart');
    return raw ? JSON.parse(raw) : [];
  });

  const signin = (u, token) => {
    setUser(u);
    localStorage.setItem('rt_user', JSON.stringify(u));
    localStorage.setItem('rt_token', token);
  };
  const signout = () => {
    setUser(null);
    localStorage.removeItem('rt_user');
    localStorage.removeItem('rt_token');
  };

  const addToCart = (item) => {
    setCart(prev => {
      const found = prev.find(p => p.product === item.product);
      const next = found
        ? prev.map(p => p.product === item.product ? { ...p, qty: p.qty + item.qty } : p)
        : [...prev, item];
      localStorage.setItem('rt_cart', JSON.stringify(next));
      return next;
    });
  };
  const updateQty = (id, qty) => {
    setCart(prev => {
      const next = prev.map(p => p.product === id ? { ...p, qty } : p);
      localStorage.setItem('rt_cart', JSON.stringify(next));
      return next;
    });
  };
  const removeFromCart = (id) => {
    setCart(prev => {
      const next = prev.filter(p => p.product !== id);
      localStorage.setItem('rt_cart', JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(
    () => ({ user, signin, signout, cart, addToCart, updateQty, removeFromCart }),
    [user, cart]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
