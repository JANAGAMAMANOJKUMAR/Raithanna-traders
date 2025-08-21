import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-4">

      {/* Hero Banner */}
      <div
        id="heroCarousel"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner rounded shadow">
          <div className="carousel-item active">
            <img
              src="/images/friend-shop.jpg"
              className="d-block w-100"
              alt="Fertilizers"
              style={{ height: "900px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
              <h3>Welcome to Raithanna Traders</h3>
              <p>Your trusted fertilizer & agriculture partner</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-photo/farmers-market.jpg"
              className="d-block w-100"
              alt="Products"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* Shop Categories */}
      <h2 className="text-center mb-4">Shop by Categories</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <img
              src="/images/fertilizer.jpg"
              className="card-img-top"
              alt="Fertilizers"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Fertilizers</h5>
              <Link to="/products" className="btn btn-success">
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <img
              src="/images/seeds.jpg"
              className="card-img-top"
              alt="Seeds"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Seeds</h5>
              <Link to="/products" className="btn btn-success">
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <img
             src="/images/pesticides.jpg"
              className="card-img-top"
              alt="Tools"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Pesticides</h5>
              <Link to="/products" className="btn btn-success">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
