import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { SearchBar } from '../SearchBar/SearchBar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';

import { fetchImages } from '../../api';
import { Loader } from '../Loader/Loader';

import { MainContainer } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    noResults: false,
    totalPages: 0,
  };

  changeQuery = newQuery => {
    if (newQuery === this.state.query) {
      return Notify.failure('Please, enter search params');
    }

    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;

    if (prevQuery !== newQuery || prevState.page !== this.state.page) {
      const normalizedQuery = newQuery.slice(newQuery.indexOf('/') + 1);

      this.setState({ loading: true });

      try {
        const images = await fetchImages(normalizedQuery, this.state.page);

        if (images.hits.length === 0) {
          Notify.failure(
            'No images have been found according to your request. Please, try again!'
          );
          this.setState({
            loading: false,
          });
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          loading: false,
          totalPages: Math.ceil(images.totalHits / 12),
        }));
      } catch (error) {
        console.log(error);
        this.setState({ loading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.setState({ loading: true });
  };

  render() {
    const { images, loading, page, totalPages } = this.state;
    return (
      <MainContainer>
        <div>
          <SearchBar onSubmit={this.changeQuery} />
        </div>
        <div>
          <ImageGallery images={images} />
        </div>
        {loading && <Loader />}
        <div>
          {images.length !== 0 && totalPages !== page && (
            <Button onClick={this.handleLoadMore} />
          )}
        </div>
      </MainContainer>
    );
  }
}
