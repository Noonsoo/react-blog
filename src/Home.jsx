import React from "react";
import Feed from "./Feed";

import { useContext } from "react";
import DataContext from "./context/DataContext";

function Home() {
  const { searchResults, posts } = useContext(DataContext);

  return (
    <main className="Home">
      {posts?.length ? (
        <Feed posts={searchResults} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No post to display.</p>
      )}
    </main>
  );
}

export default Home;
