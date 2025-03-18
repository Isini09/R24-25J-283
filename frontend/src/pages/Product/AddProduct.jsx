import React, { useState } from "react";
import axios from "axios";
import NavBarAdmin from "../../components/NavBarAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductForm = () => {
  const [form, setForm] = useState({
    batchId: "",
    supplierName: "",
    location: "",
    dateStarted: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/add", form); // Pass form data
      toast.success("Product added successfully!", { position: "top-right", autoClose: 3000 });
      resetForm();
    } catch (error) {
      toast.error("Failed to add product!");
      console.error("Error adding product:", error.response ? error.response.data : error.message);
      resetForm();
    }
  };
  

  const resetForm = () => {
    setForm({
      batchId: "",
      supplierName: "",
      location: "",
      dateStarted: "",
      status: "",
    });
  };

  return (
    <div className="">
      <NavBarAdmin />
      <ToastContainer /> 

      <div className="flex ml-[250px] py-[60px]">
        <div>
          <div className="mb-8 text-2xl font-bold ">
            <h1>Add New Batch</h1>
          </div>

          <form onSubmit={handleSubmit}> 
            <div>
              <div>Batch ID</div>
              <input
                className="border-2 w-[350px] mt-2 mb-4 rounded-xl px-2 py-2"
                type="text"
                placeholder="Batch ID"
                value={form.batchId}
                onChange={(e) => setForm({ ...form, batchId: e.target.value })}
              />
            </div>
            <div>
              <div>Supplier Name</div>
              <input
                className="border-2 w-[350px] mt-2 mb-4 rounded-xl px-2 py-2"
                type="text"
                placeholder="Supplier Name"
                value={form.supplierName}
                onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
              />
            </div>
            <div>
              <div>Location</div>
              <input
                className="border-2 w-[350px] mt-2 mb-4 rounded-xl px-2 py-2"
                type="text"
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div>
              <div>Date Started</div>
              <input
                className="border-2 w-[350px] mt-2 mb-4 rounded-xl px-2 py-2"
                type="date"
                placeholder="Date Started"
                value={form.dateStarted}
                onChange={(e) => setForm({ ...form, dateStarted: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-8 w-[350px] mt-2 mb-4 rounded-xl px-2 py-2">
              <div>Current Status</div>
              <div className="px-2 py-2 border-2 rounded-xl">
                <select
                  className="w-[180px]"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  name="Current Status"
                  id="Current Status"
                >
                  <option value=""></option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 mt-2 text-white bg-green-700 rounded-full hover:bg-green-900">
                Add Product
              </button>
            </div>
          </form>
        </div>

        <div className="px-10">
          <img
            src="https://images.pexels.com/photos/31104863/pexels-photo-31104863/free-photo-of-tea-harvesting-in-lush-fields-of-lam-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="tealand"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
