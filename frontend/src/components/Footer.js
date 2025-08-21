import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <p>© {new Date().getFullYear()} Raithanna Traders Fertilizer Store</p>
      <p>
        Powered by <strong>Raithanna Traders</strong> | Built with ❤️ by Manoj
      </p>
    </footer>
  );
}

export default Footer;
