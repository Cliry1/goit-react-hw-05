import { useParams } from "react-router-dom";
import fetchItems from "../../movies-api";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import css from "./MovieCast.module.css";
const defaultImg =
  "https://as2.ftcdn.net/v2/jpg/00/50/02/11/1000_F_50021141_dL8LBnE0zYVcY4MNOsH9eFucRMCHxYtQ.jpg";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchItems(`/movie/${movieId}/credits`, movieId);
        setCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <>
      <h2 className={css.title}>Cast</h2>
      {loading ? (
        <div className={css.loader}>
          <Loader />
        </div>
      ) : cast.cast ? (
        <ul className={css.ul}>
          {cast.cast.map((actor, index) => {
            if (index > 9) return;
            return (
              <li className={css.li} key={actor.id}>
                <img
                  className={css.img}
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : defaultImg
                  }
                  alt={cast.cast.name}
                />
                <p>{actor.name}</p>
                {actor.character != "Himself" &&
                  actor.character != "Herself" && (
                    <p>Character: {actor.character}</p>
                  )}
                <p>Action: {actor.known_for_department}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={css.p}>No result</p>
      )}
      {error && <ErrorMessage />}
    </>
  );
}
