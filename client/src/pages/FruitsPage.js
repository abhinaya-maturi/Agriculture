import React, { useState } from "react";
import { Link } from "react-router-dom";

const FruitsPage = ({ cart = [], addToCart }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [addedItems, setAddedItems] = useState([]);

  const fruits = [
    { name: "Apple", img: "/images/apple.jpg", price: 120 },
    { name: "Banana", img: "/images/banana.jpg", price: 50 },
    { name: "Mango", img: "/images/mango.jpg", price: 150 },
    { name: "Orange", img: "/images/orange.jpg", price: 90 },
    { name: "Grapes", img: "/images/grapes.jpg", price: 80 },
    { name: "Pineapple", img: "/images/pineapple.jpg", price: 110 },
    { name: "Papaya", img: "/images/papaya.jpeg", price: 70 },
  ];

  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItems((prev) => [...prev, item.name]);
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "green",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          width: "100vw",
          margin: "0",
          boxSizing: "border-box",
        }}
      >
        <h2>Farmer Friendly Web App</h2>
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          <Link
            to="/home"
            style={{ color: "white", textDecoration: "none", margin: "0 15px", fontSize: "18px" }}
          >
            Home
          </Link>

          {/* Shop Dropdown */}
          <div
            style={{ position: "relative", margin: "0 15px", display: "inline-block" }}
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
                  padding: "5px 0",
                }}
              >
                <Link
                  to="/fruits"
                  style={{ display: "block", padding: "10px", textDecoration: "none", color: "black" }}
                >
                  Fruits
                </Link>
                <Link
                  to="/veggies"
                  style={{ display: "block", padding: "10px", textDecoration: "none", color: "black" }}
                >
                  Veggies
                </Link>
                <Link
                  to="/pulses"
                  style={{ display: "block", padding: "10px", textDecoration: "none", color: "black" }}
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
              {totalCartItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>

          <Link
            to="/"
            style={{ color: "white", textDecoration: "none", margin: "0 15px", fontSize: "18px" }}
          >
            Logout
          </Link>
        </div>
      </nav>

      {/* Fruits Section */}
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h2 style={{ marginTop: "20px" }}>Fruits</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "30px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {fruits.map((item, index) => (
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
                style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
              />
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>{item.name}</p>
              <p style={{ fontSize: "18px" }}>₹{item.price}/kg</p>
              <button
                onClick={() => handleAddToCart(item)}
                disabled={addedItems.includes(item.name)}
                style={{
                  backgroundColor: addedItems.includes(item.name) ? "gray" : "green",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  cursor: addedItems.includes(item.name) ? "not-allowed" : "pointer",
                  borderRadius: "6px",
                  fontSize: "16px",
                }}
              >
                {addedItems.includes(item.name) ? "Added to Cart" : "Add to Cart"}
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

export default FruitsPage;
