import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onLoadMore }) {
  const handleLoadMore = () => {
    onLoadMore();
  };
  return (
    <button className={css.button} onClick={handleLoadMore}>
      Load more
    </button>
  );
}
