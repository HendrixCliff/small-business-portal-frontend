import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { uploadProduct, resetState } from "../redux/productSlice";
import {  RiDeleteBin5Line} from "react-icons/ri"


const UploadProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  // Redux state
  const { loading, success, error } = useAppSelector((state) => state.product);

  // Local state
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<string>(""); // 🔹 New Stock Field
  const [category, setCategory] = useState<string>(""); // 🔹 New Category Field
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // 🔹 Predefined Categories (Example)
  const categories = ["Electronics", "Clothing", "Books", "Accessories", "Home & Kitchen"];

  // 🔹 Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      // Generate image previews
      const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    }
  };

  // 🔹 Remove Image
  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  // 🔹 Handle Upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description || !stock || !category || files.length === 0) {
      alert("Please provide all fields and select at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock); // 🔹 Add stock
    formData.append("category", category); // 🔹 Add category
    files.forEach((file) => formData.append("images", file));

    dispatch(uploadProduct(formData));
  };

  return (
    <form onSubmit={handleUpload} encType="multipart/form-data">
      <h2>Upload Product</h2>

      {/* 🔹 Product Name */}
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* 🔹 Price */}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      {/* 🔹 Stock */}
      <input
        type="number"
        placeholder="Stock Quantity"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />

      {/* 🔹 Category */}
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* 🔹 Description */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        required
      />

      {/* 🔹 Image Upload */}
      <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} />

      {/* 🔹 Image Previews */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
        {previewUrls.map((url, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={url}
              alt={`Preview ${index}`}
              width={80}
              height={80}
              style={{ borderRadius: "5px", objectFit: "cover" }}
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
             <RiDeleteBin5Line size={30}/>
            </button>
          </div>
        ))}
      </div>

      {/* 🔹 Upload Button */}
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* 🔹 Success & Error Messages */}
      {success && <p style={{ color: "green" }}>Upload successful!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔹 Reset Button */}
      {success && (
        <button type="button" onClick={() => dispatch(resetState())}>
          Reset
        </button>
      )}
    </form>
  );
};

export default UploadProductForm;
