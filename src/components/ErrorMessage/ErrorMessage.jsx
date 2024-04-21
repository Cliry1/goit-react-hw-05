import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <p className={css.error}>Oops, an error occurred, please try again.</p>
  );
}
