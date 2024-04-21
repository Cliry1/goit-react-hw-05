import css from "./ImageCard.module.css";

export default function ImageCard({ item: {
  alt_description,
  urls,
  likes
}, openModal }) {
  return (
    <div>
      <img
        className={css.img}
        src={urls.small}
        alt={alt_description}
        onClick={() => openModal({
          regular: urls.regular,
          alt_description,
          likes
        })}
      />
    </div>
  );
}
