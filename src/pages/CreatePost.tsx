import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("caption", caption);
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/create-post", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Post created:", data);

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      alert("Post created successfully!");

      setCaption("");
      setImage(null);
      setPreview(null);

      navigate("/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setImage(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">

        <h1>Create Post</h1>

        <p className="subtitle">
          Share something with everyone
        </p>

        <form onSubmit={handleSubmit}>

          {/* Caption */}

          <label htmlFor="caption">
            Caption
          </label>

          <textarea
            id="caption"
            placeholder="Write something..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* Image */}
          <label htmlFor="image" className="upload-box">
  <div className="upload-icon">⬆️</div>

  <div className="upload-title">
    Upload your image
  </div>

  <div className="upload-subtitle">
    Click to choose an image
  </div>

  <div className="upload-formats">
    PNG, JPG, WEBP
  </div>

  <input
    id="image"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
  />
</label>

          {/* Image Preview */}
{preview && (
  <div className="preview-container">
    <img
      src={preview}
      alt="Selected preview"
      className="image-preview"
    />

    <button
      type="button"
      className="remove-image"
      onClick={() => {
        setImage(null);
        setPreview(null);
      }}
    >
      ✕
    </button>
  </div>
)}
          {/* Selected File */}

          {image && (
            <p className="selected-file">
              Selected: {image.name}
            </p>
          )}

          {/* Submit */}

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Create Post"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreatePost;