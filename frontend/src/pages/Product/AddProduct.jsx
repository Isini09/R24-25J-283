import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [form, setForm] = useState({
    batchId: "",
    flavor: "",
    supplierName: "",
    location: "",
    moistureContent: "",
    caffeineContent: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/add", form);
      alert("Product added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const resetForm = () => {
    setForm({
      batchId: "",
      flavor: "",
      supplierName: "",
      location: "",
      moistureContent: "",
      caffeineContent: "",
    });
  };

  return (
    <div className="flex">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Batch ID"
          value={form.batchId}
          onChange={(e) => setForm({ ...form, batchId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Flavor"
          value={form.flavor}
          onChange={(e) => setForm({ ...form, flavor: e.target.value })}
        />
        <input
          type="text"
          placeholder="Supplier Name"
          value={form.supplierName}
          onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Moisture Content (%)"
          value={form.moistureContent}
          onChange={(e) =>
            setForm({ ...form, moistureContent: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Caffeine Content (%)"
          value={form.caffeineContent}
          onChange={(e) =>
            setForm({ ...form, caffeineContent: e.target.value })
          }
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
