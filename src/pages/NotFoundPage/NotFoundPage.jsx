import { Link } from 'react-router-dom';
import css from "./NotFoundPage.module.css"
export default function NotFoundPage() {
  return (
    <div className={css.container}>
    <h1 className={css.title}>Oops, you went to the wrong link, go back to the main page</h1>
    <Link className={css.link} to="/">Go to Home</Link>
    </div>
  )
}
