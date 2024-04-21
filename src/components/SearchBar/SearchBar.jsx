import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newTopic = form.elements.topic.value.trim();
    if (newTopic == "") {
      toast.error("The search field must be filled!");
      return;
    }
    onSubmit(newTopic);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="topic"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
