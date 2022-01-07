/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import { useAtom } from 'jotai';
import VisuallyHidden from '@reach/visually-hidden';
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox';

import { clubsAtom, selectedClubAtom } from '@/store/store';

type ClubSelectorProps = {
  id: string;
};
const ClubSelector = ({ id }: ClubSelectorProps) => {
  const [clubs] = useAtom(clubsAtom);
  const [selectedClub, setSelectedClub] = useAtom(selectedClubAtom);

  let labelId = `club-label--${id}`;

  const handleClubChange = (value: string) => {
    setSelectedClub(value);
  };

  return (
    <div className="grow">
      <VisuallyHidden id={labelId}>Choose a club</VisuallyHidden>
      <ListboxInput
        aria-labelledby={labelId}
        value={selectedClub}
        onChange={handleClubChange}
        className="flex border-0 md:border-b md:border-gray-200 pb-1.5 text-gray-700"
      >
        <img className="mr-6" src="/images/afc_eskilstuna.svg" alt="" />
        <ListboxButton
          arrow={
            <img className="ml-2" src="/images/dropdown_icon.svg" alt="" />
          }
          className="border-none"
        />
        <ListboxPopover>
          <ListboxList>
            {clubs.map((club) => {
              return (
                <ListboxOption
                  key={club}
                  value={club}
                  className="flex w-48 p-1"
                >
                  <img
                    className="ml-0 mr-2"
                    src="/images/afc_eskilstuna.svg"
                    alt=""
                  />
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

export default ClubSelector;
