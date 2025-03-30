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
    <div>
      <h2>Product Videos</h2>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <h3>{video.title}</h3>
            <iframe
              width="560"
              height="315"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <br />
            <button
              onClick={() => handleDelete(video._id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              <RiDeleteBin5Line size={30}/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideosList;
