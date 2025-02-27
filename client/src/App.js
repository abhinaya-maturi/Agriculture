// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register"; // Update to match file names
// // Import other pages only if they exist
// import Home from "./pages/Home";
// import FruitsPage from "./pages/FruitsPage";
// import VeggiesPage from "./pages/VeggiesPage";
// import PulsesPage from "./pages/PulsesPage";
// import CartPage from "./pages/CartPage";
// import { AuthProvider } from "./context/AuthContext"; // Ensure this exists


// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Register />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/fruits" element={<FruitsPage />} />
//           <Route path="/veggies" element={<VeggiesPage />} />
//           <Route path="/pulses" element={<PulsesPage />} />
//           <Route path="/cart" element={<CartPage />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FruitsPage from "./pages/FruitsPage";
import VeggiesPage from "./pages/VeggiesPage";
import PulsesPage from "./pages/PulsesPage";
import CartPage from "./pages/CartPage";
import { AuthProvider } from "./context/AuthContext";
import FarmerDashboard from "./pages/FarmerDashboard";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Function to remove items from the cart (optional)
  const removeFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== itemName));
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={<Home />} />
          
          {/* Pass cart and addToCart to all pages that need them */}
          <Route
            path="/fruits"
            element={<FruitsPage cart={cart} addToCart={addToCart} />}
          />
          <Route
            path="/veggies"
            element={<VeggiesPage cart={cart} addToCart={addToCart} />}
          />
          <Route
            path="/pulses"
            element={<PulsesPage cart={cart} addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={<CartPage cart={cart} setCart={setCart} removeFromCart={removeFromCart} />}
          />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
