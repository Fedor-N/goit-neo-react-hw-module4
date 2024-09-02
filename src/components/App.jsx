import css from "./App.module.css";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import fetchImagesByKeyword from "../unsplash-api";
import SesrchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from "./ImageModal/ImageModal";


const App = () => {  
  const [images, setImages] = useState([]);

  const [searchInput, setSearchInput] = useState(""); 
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [loadMore, setLoadMore] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const handleSearch = (searchInput) => {
    setSearchInput(searchInput);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!searchInput) {
      return;
    };
    async function fetchImages() {
      try {
        setLoading(true);
        setError(false);
        setLoadMore(false);
        setIsModalOpen(false);
        const response = await fetchImagesByKeyword(searchInput, page);
        if (response.total === 0) {
          toast("Sorry, there are no images matching your search query. Please try again.", {
            style: {
              border: '1px solid black',
              padding: '16px',
              background: '#f58d16'
            },
            icon: "🛇",
            position: "top-right"
          });
          return;
        };

        setImages([
          ...images,
          ...response.results]);
        setLoadMore(true);

        if (page * 16 >= response.total) {
          toast("We're sorry, but you've reached the end of search results.", {
            style: {
              border: '1px solid black',
              padding: '16px',
              background: '#b9e2fa'
            },
            icon: "⚠︎",
            position: "bottom-center"
          });
          setLoadMore(false);
        };
        
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      };
    };
    fetchImages();
  }, [page, searchInput]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (modalImage) => {
    setIsModalOpen(true);
    setModalImg(modalImage);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImg(null);
  };

  return (
    <>
      <SesrchBar handleSearch={handleSearch} />
      <Toaster />
      <div className={css.container}>
        {error ? <ErrorMessage /> : <ImageGallery imageList={images} openModal={openModal} />}
        {loading && <Loader />}
        {loadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
        {isModalOpen && <ImageModal
          closeModal={closeModal}
          modalImg={modalImg}
        />}
        
      </div>
    </>
  );
};

export default App;
