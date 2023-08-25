import { ModalImg } from 'components/Modal/Modal';
import { useState } from 'react';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imgUrl, imgLargeUrl, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <GalleryItem>
      <GalleryItemImage
        onClick={toggleModal}
        src={imgUrl}
        alt={tags}
        width="240"
      />
      <ModalImg
        largeUrl={imgLargeUrl}
        isModalOpen={isModalOpen}
        onClose={toggleModal}
      />
    </GalleryItem>
  );
};
