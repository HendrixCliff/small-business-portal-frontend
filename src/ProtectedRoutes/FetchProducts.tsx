import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../redux/getProductSlice";
import { updateProduct } from "../redux/updateProductSlice";
import { placeOrder, resetOrderState } from "../redux/orderSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import ProductCard from "./ProductCard";
import { Product } from "../redux/getProductSlice";
import { RiResetRightFill } from "react-icons/ri";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.fetchProducts);
  const { loading: orderLoading, success, error: orderError } = useAppSelector((state) => state.order);

  const [selectedProducts, setSelectedProducts] = useState<{ productId: string; quantity: number }[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [updatedDetails, setUpdatedDetails] = useState<Partial<Product>>({});

  // 🔹 Fetch all products
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // 🔹 Auto-reset order success message
  useEffect(() => {
    if (success) {
      setTimeout(() => dispatch(resetOrderState()), 3000);
    }
  }, [success, dispatch]);

  // 🔹 Calculate total price
  useEffect(() => {
    const total = selectedProducts.reduce((sum, selected) => {
      const product = products.find((p) => p._id === selected.productId);
      return sum + (product ? product.price * selected.quantity : 0);
    }, 0);
    setTotalPrice(total);
  }, [selectedProducts, products]);

  // 🔹 Toggle selection
  const toggleProductSelection = (product: Product) => {
    setSelectedProducts((prevSelected) => {
      const existingProduct = prevSelected.find((p) => p.productId === product._id);

      if (existingProduct) {
        // If already selected, remove it
        return prevSelected.filter((p) => p.productId !== product._id);
      } else {
        // Otherwise, add with quantity 1
        return [...prevSelected, { productId: product._id, quantity: 1 }];
      }
    });
  };

  // 🔹 Update Quantity for Selected Product
  const updateQuantity = (productId: string, quantity: number) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((p) =>
        p.productId === productId ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  // 🔹 Delete a product
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  // 🔹 Place order
  const handlePlaceOrder = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product.");
      return;
    }
    dispatch(placeOrder(selectedProducts));
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setUpdatedDetails({ name: product.name, price: product.price, description: product.description });
  };

  const handleUpdate = () => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct._id, updates: updatedDetails }));
      setEditingProduct(null);
      setUpdatedDetails({});
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Product List</h2>

      {/* 🔹 Status messages */}
      {loading && <p className="text-blue-500 text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {orderLoading && <p className="text-blue-500">Placing order...</p>}
      {success && (
        <p className="text-green-500">
          Order placed successfully!
          <button className="ml-2 text-blue-500 underline" onClick={() => dispatch(resetOrderState())}>
            <RiResetRightFill />
          </button>
        </p>
      )}
      {orderError && <p className="text-red-500">{orderError}</p>}

      {/* 🔹 Product list */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isSelected={selectedProducts.some((p) => p.productId === product._id)}
            onSelect={() => toggleProductSelection(product)}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product._id)}
          />
        ))}
      </ul>
      {editingProduct && (
  <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
    <h3 className="text-lg font-semibold">Edit Product</h3>
    <input
      type="text"
      value={updatedDetails.name || ""}
      onChange={(e) => setUpdatedDetails({ ...updatedDetails, name: e.target.value })}
      placeholder="Product Name"
      className="border p-2 w-full mt-2"
    />
    <input
      type="number"
      value={updatedDetails.price || ""}
      onChange={(e) => setUpdatedDetails({ ...updatedDetails, price: Number(e.target.value) })}
      placeholder="Price"
      className="border p-2 w-full mt-2"
    />
    <input
      type="text"
      value={updatedDetails.description || ""}
      onChange={(e) => setUpdatedDetails({ ...updatedDetails, description: e.target.value })}
      placeholder="Description"
      className="border p-2 w-full mt-2"
    />
    
    {/* 🔹 Update Button */}
    <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">
      Update
    </button>

    {/* 🔹 Cancel Button */}
    <button
      onClick={() => setEditingProduct(null)}
      className="bg-gray-500 text-white px-4 py-2 mt-2 rounded-md ml-2"
    >
      Cancel
    </button>
  </div>
)}

      {/* 🔹 Selected Products Summary */}
      {selectedProducts.length > 0 && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">Selected Products</h3>
          <ul>
            {selectedProducts.map((selected) => {
              const product = products.find((p) => p._id === selected.productId);
              if (!product) return null;
              return (
                <li key={selected.productId} className="flex justify-between items-center mb-2">
                  <span>{product.name} - ${product.price}</span>
                  <input
                    type="number"
                    value={selected.quantity}
                    onChange={(e) => updateQuantity(selected.productId, Number(e.target.value))}
                    className="border p-1 w-16 text-center"
                    min="1"
                  />
                </li>
              );
            })}
          </ul>
          <p className="text-lg font-bold mt-3">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      )}

      {/* 🔹 Place Order Button */}
      {selectedProducts.length > 0 && (
        <button
          onClick={handlePlaceOrder}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 w-full"
        >
          {orderLoading ? "Placing Order..." : `Place Order - $${totalPrice.toFixed(2)}`}
        </button>
      )}
    </section>
  );
};

export default ProductList;
