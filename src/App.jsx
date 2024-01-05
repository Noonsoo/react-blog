import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import About from "./About.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Home from "./Home.jsx";
import NewPost from "./NewPost.jsx";
import Missing from "./Missing.jsx";
import PostPage from "./PostPage.jsx";
import Root from "./Root";
import { format } from "date-fns";
import api from "./api/posts";
import EditPost from "./EditPost.jsx";
import { useContext } from "react";
import DataContext from "./context/DataContext";

function App() {
  const {
    posts,
    setPosts,
    search,
    setSearch,
    searchResults,
    setSearchResults,
  } = useContext(DataContext);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (error) {
  //       // response not in the 200 range
  //       if (error.response) {
  //         console.log(error.response.data);
  //       } else {
  //         console.log(`Error: ${error.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  // useEffect(() => {
  //   const filteredResults = posts.filter(
  //     (post) =>
  //       post.body.toLowerCase().includes(search.toLowerCase()) ||
  //       post.title.toLowerCase().includes(search.toLowerCase())
  //   );
  //   console.log(filteredResults);
  //   setSearchResults(filteredResults.reverse());
  // }, [posts, search]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root search={search} setSearch={setSearch} />}>
        <Route index element={<Home posts={searchResults} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
        <Route path="post" element={<NewPost />} />

        <Route path="post/:id">
          <Route
            index
            element={<PostPage posts={posts} setPosts={setPosts} />}
          />
          <Route path="edit/:id" element={<EditPost />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
