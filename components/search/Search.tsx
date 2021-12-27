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
        className="flex items-center w-full px-4 py-2 grow bordergray-200"
      >
        <SearchIcon className="mr-3 textgray-400" />
        <ComboboxInput
          placeholder="Search by name, email, birthdate..."
          className="w-full outline-none text-sm"
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
