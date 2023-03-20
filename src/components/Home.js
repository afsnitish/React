import React, { useState, useEffect } from "react";
import Loading from "./Load";
import MovieComponent from "./Movie";

const Home = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getCardData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
    );
    const data = await res.json();
    setCard((prev) => [...prev, ...data]);
    setLoading(false);
  };

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <>
      <MovieComponent movieInfo={card} />
      {loading && <Loading />}
    </>
  );
};

export default Home;
