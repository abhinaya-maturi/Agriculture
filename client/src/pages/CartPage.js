import React from "react";
import { Link } from "react-router-dom";

const CartPage = ({ cart, setCart, removeFromCart }) => {
  const increaseQuantity = (itemName) => {
    setCart(cart.map(item =>
      item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (itemName) => {
    setCart(cart.map(item =>
      item.name === itemName && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/images/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Header Section */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
      }}>
        <h1 style={{ margin: 0 }}>Farmer Friendly Web App</h1>
        <nav>
          <Link to="/home" style={{
            color: "#fff",
            textDecoration: "none",
            padding: "5px 15px",
            backgroundColor: "#4caf50",
            borderRadius: "5px"
          }}>
            Home
          </Link>
        </nav>
      </header>

      {/* Cart Content */}
      <div style={{
        padding: "30px",
        textAlign: "center",
        color: "#fff",
        position: "relative",
        zIndex: 1,
      }}>
        <h2>Your Cart 🛒</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "left",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            borderRadius: "10px",
          }}>
            {cart.map((item, index) => (
              <div key={index} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}>
                <div>
                  <strong>{item.name}</strong>
                  <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                </div>
                <div>
                  <button onClick={() => decreaseQuantity(item.name)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.name)}>+</button>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <h3 style={{ marginTop: "20px", textAlign: "right" }}>Total: ₹{totalPrice}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
