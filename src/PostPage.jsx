import { useContext } from "react";
import DataContext from "./context/DataContext";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import api from "./api/posts";
function PostPage() {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const filteredResults = posts.filter((post) => post.id !== id);
      setPosts(filteredResults);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {(post && (
          <>
            <h2 className="postTitle">{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`edit/${post.id}`}>
              {" "}
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="post_button"
              onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        )) || (
          <>
            <h2>Post not found</h2>
            <p>Well, thats disappointing</p>
            <p>
              <Link to="/">Go to Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
}

export default PostPage;
