import fetchItems from "../../movies-api"
import { useEffect, useState } from "react"
import { useSearchParams} from 'react-router-dom';
import MovieList from "../../components/MovieList/MovieList"
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css"
export default function MoviesPage() {
  const [movies, setMovies]= useState([]);
  const [loading, setLoading]= useState(false);
  const [error, setError]= useState(false);
  const [params, setParams] = useSearchParams();

  const queryFilter = params.get('query') ?? '';

  useEffect(()=>{


    const fetchMovies = async ()=>{
      if (!queryFilter) return;
      try {
        setLoading(true);
        setError(false);
        setMovies([]);
        const data = await fetchItems('/search/movie', queryFilter)
        setMovies(data.results);
      } catch (error) {
        setError(true);
      }
        finally {
        setLoading(false);
      }
    }
    fetchMovies()
  },[queryFilter])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const form = e.target;
    setParams({query:form.elements.query.value})
    form.reset()
  } 

  return (
    <>

      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input} type="text" name="query"/>
        <button className={css.button}>Search</button>
      </form>
      {movies.length>0 && <MovieList items={movies}/>}
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </>
  )
}
