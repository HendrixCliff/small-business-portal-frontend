import React, { useEffect } from "react";
import { useAppSelector } from "./../hooks/useAppSelector";
import { useAppDispatch } from "./../hooks/useAppDispatch";
import { fetchVideos } from "../redux/productVideoSlice"; // Adjust path as needed
import { deleteProduct } from "./../redux/productVideoSlice"; // Import delete action
import {  RiDeleteBin5Line} from "react-icons/ri"

const VideosList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { videos, loading, error } = useAppSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      dispatch(deleteProduct(id)); // Dispatch delete action
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!Array.isArray(videos)) {
    console.error("videos is not an array:", videos); // Debugging
    return <p>Data format error</p>;
  }

  return (
    <section>
      <h2>Product Videos</h2>
      <ul>
      {videos.map((video) => (
  <li key={video._id} className="w-full max-w-[600px] mx-auto">
    <h3 className="text-lg font-semibold text-center">{video.title}</h3>
    
    {/* Responsive Video Wrapper */}
    <div className="relative w-full h-0 pb-[56.25%] mt-2">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-md shadow-lg"
        src={video.url}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>

    {/* Delete Button */}
    <button
      onClick={() => handleDelete(video._id)}
      className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 block mx-auto"
    >
      <RiDeleteBin5Line size={30} />
    </button>
  </li>
))}

      </ul>
    </section>
  );
};

export default VideosList;
