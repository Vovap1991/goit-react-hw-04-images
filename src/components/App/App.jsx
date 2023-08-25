import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';

import { fetchImages } from '../../api';
import { Loader } from '../Loader/Loader';

import { MainContainer } from './App.styled';
import { useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const changeQuery = newQuery => {
    if (newQuery === query) {
      return Notify.failure('Please, enter search params');
    }
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
  };

  return (
    <MainContainer>
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
