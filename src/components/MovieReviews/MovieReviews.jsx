import { useParams } from "react-router-dom";
import fetchItems from "../../movies-api";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import css from "./MovieReviews.module.css";
const defaultImg =
  "https://as2.ftcdn.net/v2/jpg/00/50/02/11/1000_F_50021141_dL8LBnE0zYVcY4MNOsH9eFucRMCHxYtQ.jpg";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchItems(`/movie/${movieId}/reviews`, movieId);
        setReviews(data.results);
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
      <h2 className={css.title}>Reviews</h2>
      {loading ? (
          <Loader />
      ) : reviews[0] ? (
        <ul className={css.ul}>
          {reviews.map((review, index) => {
            if (index > 9) return;
            return (
              <li className={css.li} key={review.id}>
                <img
                  className={css.img}
                  src={
                    review.author_details.avatar_path
                      ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                      : defaultImg
                  }
                  alt={review.author}
                />
                <div className={css.blockText}>
                  <h3 className={css.author}>{review.author}</h3>
                  <p>{review.content}</p>
                </div>
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
