import SearchBar from "./SearchBar/SearchBar";
import css from "./App.module.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageModal from "./ImageModal/ImageModal";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";


export default function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [topic, setTopic] = useState("");
  const [totalPages, setTotalPages] = useState(null);

  function openModal(item) {
    setIsOpen(true);
    setModalItem(item);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (topic === "") {
      return;
    }

    const searchImg = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchArticles(topic, pageCount);
        if (data.total_pages === 0) {
          return toast.error("No results!");
        }
        setTotalPages(data.total_pages);
        setArticles((prevArticles) => [...prevArticles, ...data.results]);

      } catch (error) {
        toast.error("Error!!!");
        setError(true);
        setArticles([]);
        setTotalPages(null);
        setPageCount(1);
        setTopic("");
        
      } finally {
        setLoading(false);
      }
    };
    searchImg();
    if (pageCount == totalPages) {
      toast.error("These are all found pictures for your request!");
    }
  }, [topic, pageCount]);

  const handleSearch = async (topic) => {
    setArticles([]);
    setPageCount(1);
    setTopic(topic);
  };

  const handleSearchAdd = async () => {
    setPageCount((prevCount) => prevCount + 1);
  };

  async function fetchArticles(topic, pageCount) {
    const itemParam = new URLSearchParams({
      client_id: "zswY079qTyGv_X4mnQxlTfwxYMYdyFlo-S6rA35ODMI",
      query: topic,
      page: pageCount,
      orientation: "landscape",
    });
    const collection = await axios.get(
      `https://api.unsplash.com/search/photos?${itemParam}`
    );

    return collection.data;
  }

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}
      {articles.length > 0 && (
        <ImageGallery items={articles} openModal={openModal} />
      )}

      <Toaster position="top-right " />
      <ImageModal img={modalItem} closeModal={closeModal} modalIsOpen={modalIsOpen}/>
      
      {loading && (
        <div className={css.loader}>
          <Loader />
        </div>
      )}
      {pageCount < totalPages && <LoadMoreBtn onLoadMore={handleSearchAdd} />}
    </div>
  );
}
