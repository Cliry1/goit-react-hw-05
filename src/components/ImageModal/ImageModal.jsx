import css from "./ImageModal.module.css";
import { AiFillLike } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
  },
  overlay: {
    backgroundColor: "#010101db",
  },
};

export default function ImageModal({ img:{regular, alt_description, likes}, closeModal, modalIsOpen }) {
  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={css.mainContainer}>
        <img
          className={css.img}
          src={regular}
          alt={alt_description}
        />
        <div className={css.container}>
          <div className={css.containerStatLikes}>
            <AiFillLike className={css.svg} />
            <p className={css.likes}>Likes: {likes}</p>
          </div>
          <div className={css.containerStatDesc}>
            <MdDescription className={css.svg} />
            <p className={css.description}>{alt_description}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
