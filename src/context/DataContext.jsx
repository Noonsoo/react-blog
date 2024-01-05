import { createContext, useState, useEffect } from "react";
import api from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3000/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, []);
  console.log(data);
  useEffect(() => {
    const filteredResults = posts?.filter(
      (post) =>
        post?.body.toLowerCase().includes(search?.toLowerCase()) ||
        post?.title.toLowerCase().includes(search?.toLowerCase())
    );
    console.log(filteredResults);
    setSearchResults(filteredResults?.reverse());
  }, [posts, search]);
  console.log(posts);
  console.log(posts.length);

  return (
    <DataContext.Provider
      value={{
        posts,
        setPosts,
        search,
        fetchError,
        isLoading,
        setSearch,
        searchResults,
        setSearchResults,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
