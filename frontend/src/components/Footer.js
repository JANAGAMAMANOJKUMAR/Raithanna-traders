import React from 'react';

export default function Footer(){
  return (
    <footer className="footer mt-auto">
      <div className="container text-center">
        <small>© {new Date().getFullYear()} Raithanna Traders Fertilizer Store</small>
      </div>
    </footer>
  );
}
