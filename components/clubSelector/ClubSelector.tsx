import * as React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import {
  Listbox,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox';

type ClubSelectorProps = {
  id: string;
  defaultClub: string;
  clubs: string[];
};
export const ClubSelector = ({
  id,
  defaultClub,
  clubs,
}: ClubSelectorProps): JSX.Element => {
  let [value, setValue] = React.useState(defaultClub);
  let labelId = `club-label--${id}`;

  return (
    <div className="border-b border-cool-gray-200 pb-1.5">
      <VisuallyHidden id={labelId}>Choose a club</VisuallyHidden>
      <ListboxInput
        aria-labelledby={labelId}
        value={value}
        onChange={(value) => setValue(value)}
        className="flex"
      >
        <img className="mr-6" src="/images/afc_eskilstuna.svg" />
        <ListboxButton
          arrow={<img className="ml-2" src="/images/dropdown_icon.svg" />}
          className="border-none"
        />
        <ListboxPopover>
          <ListboxList>
            {clubs.map((club) => {
              return (
                <ListboxOption
                  key={club}
                  value={club}
                  className="flex p-1 w-48"
                >
                  <img className="ml-0 mr-2" src="/images/afc_eskilstuna.svg" />
                  <span className="font-medium font-lg">{club}</span>
                </ListboxOption>
              );
            })}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
};
