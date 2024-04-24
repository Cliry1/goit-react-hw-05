import { useEffect, useState } from "react"
import fetchItems from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList"
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css"
export default function HomePage() {
  const [movies, setMovies]= useState([]);
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState(false);

useEffect(()=>{
  const fetchMovies= async ()=>{
    try {
      setLoading(true);
      setError(false);
      const data = await fetchItems('/trending/movie/day')
      setMovies(data.results);
    } catch (error) {
      setError(true);
    }
      finally {
      setLoading(false);
    }
  }
  fetchMovies()
},[])



  return (
    <>
      <h1 className={css.mainTitle}>Trending Today</h1>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length>0 && <MovieList items={movies}/>}
    </>
    
  )
}
