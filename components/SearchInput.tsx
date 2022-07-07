import { SearchIcon, XIcon } from '@heroicons/react/outline';
import type { ChangeEvent, FC, FormEvent, ReactElement } from 'react';

interface SearchInputProps {
  handleSubmit: (e: FormEvent) => void;
  handleReset: (e: FormEvent) => void;
  searchTerm: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = ({ searchTerm, handleSubmit, handleReset, handleChange }): ReactElement => {
  return (
    <form
      className="w-full relative"
      onSubmit={handleSubmit}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 cursor-pointer">
        <SearchIcon
          className={`${searchTerm ? 'text-gray-800' : 'text-gray-400'} w-5 h-5`}
          onClick={handleSubmit}
        />
      </span>

      <span className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer">
        {searchTerm
          ? <XIcon className="w-5 h-5" onClick={handleReset} />
          : <></>
        }
      </span>

      <input
        type="text"
        className="w-full rounded-lg border-gray-400 focus:border-blue-900 hover:bg-gray-50 px-12 py-3"
        placeholder="Buscar suscriptor"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchInput;
