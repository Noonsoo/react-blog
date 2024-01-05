import { useContext, useState } from "react";
import DataContext from "./context/DataContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/posts";

function NewPost() {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length + 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      console.log(response);

      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostBody("");
      setPostTitle("");
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="PostTitle">Title:</label>
        <input
          id="PostTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="PostBody">Post</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default NewPost;
