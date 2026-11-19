import ThemeToggle from "../component/ThemeToggle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  _id: string;
  caption: string;
  image: string;
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="page">

      {/* Navbar */}
      <nav className="navbar">
  <h1 className="logo">Postify</h1>

  <div className="nav-actions">
    <ThemeToggle />

    <Link to="/create" className="create-btn">
      + Create Post
    </Link>
  </div>
</nav>

      {/* Main */}
      <main className="feed">

        <div className="feed-header">
          <div>
            <h2>All Posts</h2>
            <p>See what people are sharing</p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="empty">
            <h3>No posts yet</h3>
            <p>Be the first one to create a post.</p>

            <Link to="/create" className="create-btn">
              Create Post
            </Link>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <article className="post-card" key={post._id}>

                <div className="image-container">
                  <img
                    src={post.image}
                    alt={post.caption}
                  />
                </div>

                <div className="post-content">
                  <p>{post.caption}</p>
                </div>

              </article>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}

export default Posts;