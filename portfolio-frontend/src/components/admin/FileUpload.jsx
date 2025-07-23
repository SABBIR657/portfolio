import { useState } from "react";
import api from "../../api/base";

const FileUpload = ({ endpoint, existingImage, onUploadSuccess }) => {
  const [preview, setPreview] = useState(existingImage?.url || "");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await api.put(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onUploadSuccess(data);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-32 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
      </div>

      <form onSubmit={handleUpload} className="space-y-2">
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
        />

        <button
          type="submit"
          disabled={loading || !preview}
          className={`px-4 py-2 text-sm rounded-md ${
            loading || !preview
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
