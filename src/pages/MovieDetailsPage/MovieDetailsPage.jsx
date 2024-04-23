import { Suspense, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import fetchItems from "../../movies-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";
import { NavLink, Outlet } from "react-router-dom";
const defaultImg =
  "https://as2.ftcdn.net/v2/jpg/00/50/02/11/1000_F_50021141_dL8LBnE0zYVcY4MNOsH9eFucRMCHxYtQ.jpg";

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchItems(`/movie/${movieId}`, movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <div className={css.wrapper}>
        <NavLink className={css.back} to={backLinkHref}>
          Go to back
        </NavLink>
      <div className={css.main}>

        <div className={css.mainContainer}>
          <img
            className={css.img}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImg
            }
            alt={movie.title}
          />
          <div className={css.containerText}>
            {loading && (
              <div className={css.loader}>
                <Loader />
              </div>
            )}
            {error && <ErrorMessage />}
            {movie.title && (
              <>
                <h1>{movie.title}</h1>
                <p className={css.rating}>
                  Rating:{" "}
                  {movie.vote_count > 0
                    ? `${Math.floor(movie.vote_average)} / 10`
                    : "No result at this moment"}{" "}
                </p>
                <p>
                  Vote count:{" "}
                  {movie.vote_count > 0
                    ? `${movie.vote_count}`
                    : "No vote at this moment"}
                </p>
                <p>
                  Genres:{" "}
                  {movie.genres
                    ? movie.genres.map((genre) => genre.name).join(", ")
                    : "No result at this moment"}
                </p>
                <p>Description: {movie.overview}</p>
                <p>Release date: {movie.release_date}</p>
                <div className={css.navigation}>
                  <NavLink
                    className={css.link}
                    to="cast"
                    state={location.state}
                  >
                    Cast
                  </NavLink>
                  <NavLink
                    className={css.link}
                    to="reviews"
                    state={location.state}
                  >
                    Reviews
                  </NavLink>
                </div>
              </>
            )}
          </div>
        </div>
        <Suspense fullback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
