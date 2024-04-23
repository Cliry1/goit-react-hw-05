import css from "./MovieCard.module.css"
export default function MovieCard({movie}) {
  const defaultImg =
    'https://as2.ftcdn.net/v2/jpg/00/50/02/11/1000_F_50021141_dL8LBnE0zYVcY4MNOsH9eFucRMCHxYtQ.jpg';
  return (
    <>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : defaultImg
        }
        className={css.img}
        alt={movie.title}
        width={280}

      />
      <h2 className={css.title}>{movie.title}</h2>
      <p className={css.rating}>Rating: {movie.vote_count > 0
    ? `${Math.floor(movie.vote_average)} / 10`
    : "No result at this moment"} </p>
    </>
  );
}             