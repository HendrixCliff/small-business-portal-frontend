import React from "react";
import { Product } from "../redux/getProductSlice";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onSelect, onEdit, onDelete }) => {
  return (
    <li
      className={`bg-white shadow-md w-full rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200
      ${isSelected ? "border-2 border-green-500" : ""}`}
      onClick={onSelect}
    >
      {/* Product Images */}
      {product.imageUrls?.length ? (
        <section className="flex flex-wrap justify-center gap-2">
          {product.imageUrls.map((image, index) => (
            <img key={index} src={image} alt={`${product.name} - ${index + 1}`} className="w-full h-[120px] object-cover rounded-md" />
          ))}
        </section>
      ) : (
        <p className="text-gray-400">No image available</p>
      )}

      {/* Product Details */}
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-700 mt-1">Price: ${product.price}</p>
      <p className="text-gray-600 mt-1">{product.description}</p>

      {/* Action Buttons */}
      <button className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-200 flex items-center" onClick={onEdit}>
        <AiFillEdit className="mr-1" /> Edit
      </button>

      <button className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center" onClick={onDelete}>
        <RiDeleteBin5Line className="mr-1" /> Delete
      </button>
    </li>
  );
};

export default ProductCard;
