import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { uploadVideo } from "../redux/productVideoSlice";

const VideoUpload: React.FC = () => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");

  // 🔹 Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 🔹 Handle Upload
  const handleUpload = () => {
    if (!file || !title) {
      alert("Please provide a video and title.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", file);

    dispatch(uploadVideo(formData));
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Video</h2>

      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <input type="file" accept="video/*" onChange={handleFileChange} className="border p-2 w-full mb-3" />

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleUpload}
      >
        Upload Video
      </button>
    </section>
  );
};

export default VideoUpload;
