
import React, { useState, useEffect } from "react";
import axios from "axios";

const FarmerDashboard = () => {
    const [items, setItems] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        category: "Fruits",
        cost: "",
        quantity: "",
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/items", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setItems(res.data);
        } catch (err) {
            console.error("Failed to fetch items:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserInfo = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = JSON.parse(atob(token.split(".")[1]));
                setUserEmail(decoded.email || "User");
            } catch (err) {
                console.error("Failed to decode token:", err);
            }
        } else {
            setError("❌ No token found. Please log in again.");
        }
    };

    useEffect(() => {
      const fetchItems = async () => {
          try {
              const response = await axios.get("http://localhost:5000/api/items", {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
              });
              console.log("Fetched items:", response.data);
              setItems(response.data.items ?? []);  // Assuming the array is under `items`
          } catch (error) {
              console.error("Failed to fetch items:", error);
              setItems([]);
          }
      };
  
      fetchItems();
  }, []);
  

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file" && files[0]) {
            const file = files[0];
            setFormData({ ...formData, image: file });

            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            await axios.post("http://localhost:5000/api/items", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("✅ Item uploaded successfully!");
            setFormData({ name: "", category: "Fruits", cost: "", quantity: "", image: null });
            setImagePreview(null);
            fetchItems();
        } catch (err) {
            console.error("🚨 Failed to upload item:", err.response?.data?.message || err.message);
            alert("❌ Failed to upload item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        setLoading(true);

        try {
            await axios.delete(`http://localhost:5000/api/items/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            alert("✅ Item deleted successfully!");
            fetchItems();
        } catch (err) {
            console.error("🚨 Failed to delete item:", err.response?.data?.message || err.message);
            alert("❌ Failed to delete item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f8f8", minHeight: "100vh", padding: "0", margin: "0" }}>
            <header style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 0", textAlign: "center" }}>
                <h1>Farmer Friendly Web App</h1>
            </header>

            {userEmail && (
                <div style={{ textAlign: "center", margin: "20px 0", fontSize: "1.5em", color: "#333" }}>
                    Welcome, {userEmail} 🌿
                </div>
            )}

            <div style={{
                maxWidth: "900px",
                margin: "0 auto",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
            }}>
                {error && <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>{error}</div>}

                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Upload an Item</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: "grid", gap: "10px" }}>
                    <div>
                        <label>Item Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div>
                        <label>Category:</label>
                        <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Pulses">Pulses</option>
                        </select>
                    </div>

                    <div>
                        <label>Cost (₹):</label>
                        <input type="number" name="cost" value={formData.cost} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div>
                        <label>Quantity (kg):</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div>
                        <label>Upload Image:</label>
                        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
                        {imagePreview && (
                            <div style={{ marginTop: "10px" }}>
                                <strong>Image Preview:</strong>
                                <img src={imagePreview} alt="Preview" style={{ width: "150px", borderRadius: "8px", marginTop: "5px" }} />
                            </div>
                        )}
                    </div>

                    <button type="submit" style={buttonStyle} disabled={loading}>
                        {loading ? "Uploading..." : "Upload Item"}
                    </button>
                </form>

                <h2 style={{ textAlign: "center", marginTop: "30px" }}>Your Uploaded Items</h2>
                {loading ? (
                    <p style={{ textAlign: "center", color: "#777" }}>Loading items...</p>
                ) : items.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#777" }}>No items uploaded yet.</p>
                ) : (
                  <ul style={{ listStyle: "none", padding: "0" }}>
                  {(items ?? []).map((item) => (
                      <li key={item._id} style={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "10px",
                          margin: "10px 0",
                          backgroundColor: "#f9f9f9"
                      }}>
                          <strong>{item.name}</strong> ({item.category}) - ₹{item.cost} per kg, {item.quantity} kg
                          {item.image && (
                              <div>
                                  <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} style={{ width: "150px", borderRadius: "8px", marginTop: "10px" }} />
                              </div>
                          )}
                          <button onClick={() => handleDelete(item._id)} style={{ ...buttonStyle, backgroundColor: "#FF4D4D", marginTop: "10px" }}>
                              Delete
                          </button>
                      </li>
                  ))}
              </ul>
              
                )}
            </div>
        </div>
    );
};

const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ddd"
};

const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1em"
};

export default FarmerDashboard;



