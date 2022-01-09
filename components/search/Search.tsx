import * as React from 'react';
import debounce from 'lodash.debounce';
import { useAtom } from 'jotai';

import { searchAtom, selectedClubAtom } from '@/store/store';
import SearchIcon from '@/icons/search_icon.svg';

const Search = () => {
  const [, setSearchString] = useAtom(searchAtom);
  const [selectedClub] = useAtom(selectedClubAtom);
  const inputElRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // clear input element text on club change
    const inputEl = inputElRef.current;
    if (inputEl !== null) {
      inputEl.value = '';
    }
  }, [selectedClub]);

  const handleSearchStringChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  }, [setSearchString]);

  const debouncedOnSeachStringChange = React.useMemo(
    () => debounce(handleSearchStringChange, 300),
    [handleSearchStringChange]
  );

  React.useEffect(() => {
    return () => {
      debouncedOnSeachStringChange.cancel();
    };
  }, [debouncedOnSeachStringChange]);

  return (
    <div className="bg-white border rounded grow shadow-elevation-2">
      <div
        aria-labelledby="search"
        className="flex items-center w-full px-4 py-2 border-gray-200 grow"
      >
        <SearchIcon className="mr-3 text-gray-400" />
        <input
          ref={inputElRef}
          onChange={debouncedOnSeachStringChange}
          placeholder="Search by name, email, birthdate..."
          className="w-full text-sm outline-none"
        />
      </div>
    </div>
  );
};

export default Search;

// in case we need to provide a popover based serach ui, Combobox from reaci ui is good base component
// <div className="bg-white border rounded grow shadow-elevation-2">
//   <Combobox
//     aria-labelledby="search"
//     className="flex items-center w-full px-4 py-2 border-gray-200 grow"
//   >
//     <SearchIcon className="mr-3 text-gray-400" />
//     <ComboboxInput
//       ref={inputElRef}
//       onChange={debouncedOnSeachStringChange}
//       placeholder="Search by name, email, birthdate..."
//       className="w-full text-sm outline-none"
//     />
//     <ComboboxPopover>
//       <ComboboxList>
//         {/* combolist can be used to provide a popover for see search results as you type*/}
//         {/*  <ComboboxOption value="Apple" /> */}
//         {/*  <ComboboxOption value="Kiwi" /> */}
//       </ComboboxList>
//     </ComboboxPopover>
//   </Combobox>
// </div>
