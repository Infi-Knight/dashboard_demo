import * as React from 'react';
import debounce from 'lodash.debounce';

import { useAtom } from 'jotai';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import { searchAtom } from '@/store/store';
import SearchIcon from '@/icons/search_icon.svg';

const Search = () => {
  const [searchString, setSearchString] = useAtom(searchAtom);

  const handleSearchStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const debouncedOnSeachStringChange = React.useMemo(
    () => debounce(handleSearchStringChange, 300),
    []
  );

  React.useEffect(() => {
    return () => {
      debouncedOnSeachStringChange.cancel();
    };
  }, []);

  return (
    <div className="bg-white border rounded grow shadow-elevation-2">
      <Combobox
        aria-labelledby="search"
        className="flex items-center w-full px-4 py-2 border-gray-200 grow"
      >
        <SearchIcon className="mr-3 text-gray-400" />
        <ComboboxInput
          onChange={debouncedOnSeachStringChange}
          placeholder="Search by name, email, birthdate..."
          className="w-full text-sm outline-none"
        />
        <ComboboxPopover>
          <ComboboxList>
            {/* combolist can be used to provide a popover for see search results as you type*/}
            {/*  <ComboboxOption value="Apple" /> */}
            {/*  <ComboboxOption value="Kiwi" /> */}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
