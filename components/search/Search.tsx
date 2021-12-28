import * as React from 'react';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from '@reach/combobox';
import SearchIcon from '@/icons/search_icon.svg';

const Search = () => {
  return (
    <div className="border rounded grow shadow-elevation-2">
      <Combobox
        aria-labelledby="search"
        className="flex items-center w-full px-4 py-2 border-gray-200 grow"
      >
        <SearchIcon className="mr-3 text-gray-400" />
        <ComboboxInput
          placeholder="Search by name, email, birthdate..."
          className="w-full text-sm outline-none bg-body"
        />
        <ComboboxPopover>
          <ComboboxList>
            <ComboboxOption value="Apple" />
            <ComboboxOption value="Banana" />
            <ComboboxOption value="Orange" />
            <ComboboxOption value="Pineapple" />
            <ComboboxOption value="Kiwi" />
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
