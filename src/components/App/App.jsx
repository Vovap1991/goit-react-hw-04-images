import { Notify } from 'notiflix/build/notiflix-notify-aio';
import toast, { Toaster } from 'react-hot-toast';
import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { fetchImages } from '../../api';
import { Loader } from '../Loader/Loader';
import { MainContainer } from './App.styled';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const changeQuery = newQuery => {
    if (newQuery === query) {
      return toast.error('Please, enter search params');
    }
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      const normalizedQuery = query.slice(query.indexOf('/') + 1);
      try {
        setLoading(true);
        const receivedImages = await fetchImages(normalizedQuery, page);

        if (receivedImages.hits.length === 0) {
          toast.error(
            'No images have been found according to your request. Please, try again!'
          );
          setLoading(false);
        }

        setImages(prevState => [...prevState, ...receivedImages.hits]);
        setLoading(false);
        setTotalPages(Math.ceil(images.totalHits / 12));
      } catch (error) {
        console.log(error);
      }
    }
    getImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
  };

  return (
    <MainContainer>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <SearchBar onSubmit={changeQuery} />
      </div>
      <div>
        <ImageGallery images={images} />
      </div>
      {loading && <Loader />}
      <div>
        {images.length !== 0 && totalPages !== page && (
          <Button onClick={handleLoadMore} />
        )}
      </div>
    </MainContainer>
  );
};
