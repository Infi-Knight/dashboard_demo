import * as React from 'react'
import { useAtom } from 'jotai';

import StatusBadge from '@/components/statusBadge';
import { appliedFiltersAtom } from '@/store/store';
import { InvoiceStatus } from '@/types/invoice';

import RemoveIcon from '@/icons/remove_icon.svg';

export function AppliedFilters() {
  const [appliedFilters, setAppliedFilters] = useAtom(appliedFiltersAtom);

  const handleFilterClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    status: InvoiceStatus
  ) => {
    setAppliedFilters(appliedFilters.filter((filter) => filter !== status));
  };

  return (
    <div className="flex gap-2">
      {appliedFilters.map((status) => {
        return (
          <StatusBadge
            key={status}
            labelClassesOverrides="bg-gray-200 cursor-pointer border-0 pl-3 pr-2"
            onClick={(e) => handleFilterClick(e, status)}
            CustomIcon={RemoveIcon}
            iconPosition="right"
            status={status}
          ></StatusBadge>
        );
      })}
    </div>
  );
}