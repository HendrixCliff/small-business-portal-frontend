import { useState } from "react";
import { useAppDispatch } from "./../hooks/useAppDispatch";
import { registerBusiness } from "../redux/businessSlice";

const RegisterBusiness = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    description: "",
    location: "",
    logo: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerBusiness(formData)); // ✅ `owner` is NOT sent from the frontend
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-4">Register Your Business</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input type="text" name="name" placeholder="Business Name" required className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Info" required className="border p-2 rounded" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="logo" placeholder="Logo URL" className="border p-2 rounded" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" className="border p-2 rounded" onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterBusiness;
