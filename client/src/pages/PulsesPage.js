import React, { useState } from "react";
import { Link } from "react-router-dom";

const PulsesPage = ({ cart = [], addToCart }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const pulses = [
    { name: "Lentils", img: "/images/Lentils.jpeg", price: 80 },
    { name: "Chickpeas", img: "/images/Chickpeas.jpg", price: 90 },
    { name: "Beans", img: "/images/Beans.jpg", price: 85 },
    { name: "Peas", img: "/images/Peas.jpg", price: 95 },
    { name: "Greengram", img: "/images/greengram.jpg", price: 100 },
    { name: "Moong Dal", img: "/images/moong-dal.jpg", price: 70 },
    { name: "Lupin", img: "/images/Lupin.jpg", price: 75 },
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedToCart((prev) => ({ ...prev, [item.name]: true }));
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "green",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <h2>Farmer Friendly Web App</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/home"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0 15px",
              fontSize: "18px",
            }}
          >
            Home
          </Link>

          {/* Shop Dropdown */}
          <div
            style={{ position: "relative", margin: "0 15px" }}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              Shop ▼
            </button>
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  background: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  borderRadius: "5px",
                  minWidth: "150px",
                  zIndex: 100,
                  paddingTop: "10px",
                }}
              >
                <Link
                  to="/fruits"
                  style={{
                    display: "block",
                    padding: "10px",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Fruits
                </Link>
                <Link
                  to="/veggies"
                  style={{
                    display: "block",
                    padding: "10px",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Veggies
                </Link>
                <Link
                  to="/pulses"
                  style={{
                    display: "block",
                    padding: "10px",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Pulses
                </Link>
              </div>
            )}
          </div>

          {/* Cart with Badge */}
          <div style={{ position: "relative", margin: "0 15px" }}>
            <Link
              to="/cart"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
                position: "relative",
              }}
            >
              Cart 🛒
              {cart.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>

          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              margin: "0 15px",
              fontSize: "18px",
            }}
          >
            Logout
          </Link>
        </div>
      </nav>

      {/* Pulses Section */}
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2 style={{ marginTop: "20px" }}>Pulses</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "30px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {pulses.map((item, index) => (
            <div
              key={index}
              style={{
                border: "2px solid #ddd",
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                {item.name}
              </p>
              <p style={{ fontSize: "18px" }}>₹{item.price}/kg</p>
              <button
                onClick={() => handleAddToCart(item)}
                disabled={addedToCart[item.name]}
                style={{
                  backgroundColor: addedToCart[item.name] ? "gray" : "green",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  cursor: addedToCart[item.name] ? "not-allowed" : "pointer",
                  borderRadius: "6px",
                  fontSize: "16px",
                }}
              >
                {addedToCart[item.name] ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
        <Link
          to="/home"
          style={{
            display: "block",
            marginTop: "30px",
            textDecoration: "none",
            fontSize: "18px",
            color: "blue",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PulsesPage;
