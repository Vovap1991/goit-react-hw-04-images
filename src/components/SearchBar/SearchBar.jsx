import { AiOutlineSearch } from 'react-icons/ai';

import {
  SearchBarWrapper,
  SearchBarForm,
  SearchBarButton,
  SearchBarInput,
  SearchBarSpan,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  return (
    <SearchBarWrapper>
      <SearchBarForm
        onSubmit={event => {
          event.preventDefault();
          onSubmit(event.target.elements.query.value.trim());
          event.target.reset();
        }}
      >
        <SearchBarButton type="submit">
          <AiOutlineSearch size={25} color="#0a0909" />
          <SearchBarSpan>Search</SearchBarSpan>
        </SearchBarButton>

        <SearchBarInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
        />
      </SearchBarForm>
    </SearchBarWrapper>
  );
};
