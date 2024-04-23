import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard"
import css from "./MovieList.module.css"
export default function MovieList({ items }) {
  const location = useLocation();
  return (
    <ul className={css.ul}>
      {items.map((item) => (
        <li  key={item.id}>
          <Link className={css.a} to={`/movies/${item.id}`} state={location}>
            <MovieCard movie={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
