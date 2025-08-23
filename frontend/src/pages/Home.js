import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "bootstrap/js/dist/carousel";

const carouselImages = [
  { src: "/images/friend-shop.jpg", alt: "Friend Shop" },
  { src: "/images/agriculture1.jpg", alt: "Agriculture Field" },
  { src: "/images/agriculture2.jpg", alt: "Agriculture Product" },
  { src: "/images/agriculture3.jpg", alt: "Shop" },
];

function Home() {
  useEffect(() => {
    const carouselElement = document.getElementById("heroCarousel");
    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
        pause: false,
      });
    }
  }, []);

  return (
    <div className="container mt-4">
      {/* Bootstrap Carousel */}
      <div id="heroCarousel" className="carousel slide mb-5 position-relative">
        <div className="carousel-inner rounded shadow">
          {carouselImages.map((img, idx) => (
            <div
              key={img.src}
              className={`carousel-item${idx === 0 ? " active" : ""}`}
            >
              <img
                src={img.src}
                className="d-block w-100"
                alt={img.alt}
                style={{ height: "400px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Static Caption overlay on all slides */}
        <div
          className="position-absolute start-50 top-50 translate-middle text-center text-white"
          style={{
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "15px 30px",
            borderRadius: "10px",
            maxWidth: "90%",
            pointerEvents: "none", // Allows clicks through
          }}
        >
          <h3>Welcome to Raithanna Traders</h3>
          <p>Your trusted fertilizer & agriculture partner</p>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Indicators */}
        <div className="carousel-indicators" style={{ bottom: "-30px" }}>
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Shop Categories */}
      <h2 className="text-center mb-4">Shop by Categories</h2>
      <div className="row">
        {/* Fertilizers */}
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
              <Link
                to="/products?category=Fertilizers"
                className="btn btn-success"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Seeds */}
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
              <Link
                to="/products?category=Seeds"
                className="btn btn-success"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Pesticides */}
        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <img
              src="/images/pesticides.jpg"
              className="card-img-top"
              alt="Pesticides"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Pesticides</h5>
              <Link
                to="/products?category=Pesticides"
                className="btn btn-success"
              >
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
