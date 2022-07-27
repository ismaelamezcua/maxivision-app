import { SearchIcon, XIcon } from '@heroicons/react/outline';
import type { ChangeEvent, FC, FormEvent, ReactElement } from 'react';

interface SearchInputProps {
  handleSubmit: (e: FormEvent) => void;
  handleReset: (e: FormEvent) => void;
  searchTerm: string;
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = (props): ReactElement => {
  const {
    searchTerm,
    placeholder,
    handleSubmit,
    handleReset,
    handleChange,
  } = props;

  return (
    <form
      method="POST"
      className="w-full relative"
      onSubmit={handleSubmit}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 cursor-pointer">
        <SearchIcon
          className={`${searchTerm ? 'text-blue-600' : 'text-blue-700'} w-5 h-5`}
          onClick={handleSubmit}
        />
      </span>

      <span className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer ">
        {searchTerm
          ? <XIcon className="w-5 h-5 hover:bg-gray-50" onClick={handleReset} />
          : <></>
        }
      </span>

      <input
        type="text"
        className="w-full border-gray-400 focus:border-blue-700 px-12 py-3"
        placeholder={placeholder}
        name="term"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchInput;
