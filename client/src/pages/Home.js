import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const images = ["/images/Fruits.jpg", "/images/Veggies.jpeg", "/images/Pulses.jpg"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>Farmer Friendly Web App</h1>
        <ul style={styles.navLinks}>
          <li><Link to="/home" style={styles.link}>Home</Link></li>
          <li
            style={styles.dropdown}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button style={styles.dropbtn}>Shop ⌄</button>
            {dropdownOpen && (
              <div style={styles.dropdownContent}>
                <Link to="/fruits" style={styles.dropdownItem}>Fruits</Link>
                <Link to="/veggies" style={styles.dropdownItem}>Veggies</Link>
                <Link to="/pulses" style={styles.dropdownItem}>Pulses</Link>
              </div>
            )}
          </li>
          <li><Link to="/cart" style={styles.link}>Cart 🛒</Link></li>
          <li><Link to="/" style={styles.link}>Logout</Link></li>
        </ul>
      </nav>

      {/* Image Slider */}
      <div style={styles.sliderContainer}>
        <img src={images[currentImageIndex]} alt="Slide" style={styles.sliderImage} />
      </div>

      {/* Product Sections */}
      <section style={styles.products}>
        {["Fruits", "Veggies", "Pulses"].map((category, index) => (
          <div key={index} style={styles.section}>
            <h2 style={styles.categoryTitle}>{category}</h2>

            <div style={styles.productGrid}>
              {getProducts(category).map((item, idx) => (
                <div
                  key={idx}
                  style={styles.productCard}
                  onClick={() => navigate(`/${category.toLowerCase()}`)}
                >
                  <img src={item.img} alt={item.name} style={styles.productImg} />
                  <p>{item.name}</p>
                  <p>₹{item.price}/kg</p>
                  <button style={styles.button}>View More</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerLeft}>
          <img src="/images/profile.jpg" alt="Profile" style={styles.profileImage} />
        </div>
        <div style={styles.footerSection}>
          <h3>About Us</h3>
          <p>Empowering farmers with direct access to markets for better profits and transparency.<br></br>
             Ensuring buyers receive fresh, high-quality produce straight from the source.<br></br>
             Bridging the gap between farmers and consumers through a trusted platform.<br></br>
             Promoting sustainable agriculture with fair trade practices and efficient distribution.</p>
        </div>
        <div style={styles.footerSection}>
          <h3>Contact Us</h3>
          <p>Email: abhinayamaturi@gmail.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: Vijayawada, Andhra Pradesh</p>
        </div>
      </footer>
    </div>
  );
};

// Product Data
const getProducts = (category) => ({
  Fruits: [
    { name: "Apple", img: "/images/Apple.jpg", price: 50 },
    { name: "Banana", img: "/images/Banana.jpg", price: 40 },
    { name: "Mango", img: "/images/Mango.jpg", price: 60 },
    { name: "Orange", img: "/images/Orange.jpg", price: 45 },
  ],
  Veggies: [
    { name: "Carrot", img: "/images/Carrot.jpeg", price: 30 },
    { name: "Tomato", img: "/images/Tomato.jpg", price: 35 },
    { name: "Potato", img: "/images/Potato.jpg", price: 25 },
    { name: "Onion", img: "/images/Onion.jpg", price: 30 },
  ],
  Pulses: [
    { name: "Lentils", img: "/images/Lentils.jpeg", price: 80 },
    { name: "Chickpeas", img: "/images/Chickpeas.jpg", price: 90 },
    { name: "Beans", img: "/images/Beans.jpg", price: 85 },
    { name: "Peas", img: "/images/Peas.jpg", price: 95 },
  ],
}[category] || []);

const styles = {
  container: { display: "flex", flexDirection: "column", minHeight: "100vh", width: "100vw", overflowX: "hidden" },
  navbar: { 
    backgroundColor: "green", 
    padding: "20px", 
    display: "flex", 
    justifyContent: "space-around", 
    alignItems: "center", 
    width: "100%", 
    paddingRight: "15px"
  },
  logo: { color: "white", fontSize: "24px", fontWeight: "bold" },
  navLinks: { 
    listStyle: "none", 
    display: "flex", 
    alignItems: "center", 
    gap: "35px", 
    margin: 0, 
    padding: 0, 
    whiteSpace: "nowrap"
  },
  link: { textDecoration: "none", color: "white", fontSize: "18px" },
  dropdown: { position: "relative" },
  dropbtn: { color: "white", fontSize: "18px", background: "none", border: "none", cursor: "pointer" },
  dropdownContent: { 
    position: "absolute", 
    top: "100%", 
    left: 0, 
    backgroundColor: "white", 
    display: "flex", 
    flexDirection: "column", 
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", 
    minWidth: "150px", 
    zIndex: 10 
  },
  dropdownItem: { padding: "10px", textDecoration: "none", color: "black", display: "block" },
  sliderContainer: { width: "100%", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", backgroundColor: "#f0f0f0" },
  sliderImage: { width: "100%", height: "100%", objectFit: "cover" },
  
  products: { padding: "40px 20px" },
  section: { marginBottom: "50px" },
  categoryTitle: { textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" },
  productCard: { border: "1px solid #ddd", padding: "15px", textAlign: "center", borderRadius: "10px", cursor: "pointer", height: "500px" },
  productImg: { width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" },
  button: { backgroundColor: "green", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" },

  footer: { 
    backgroundColor: "green", 
    color: "white", 
    padding: "20px", 
    width: "100%", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: "auto" 
  },
  footerLeft: { display: "flex", alignItems: "center" },
  profileImage: { width: "150px", height: "150px", borderRadius: "50%", marginRight: "20px" },
  footerSection: { textAlign: "left" },
};

export default Home;
