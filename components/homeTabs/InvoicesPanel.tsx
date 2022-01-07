import * as React from 'react';
import { useAtom } from 'jotai';

import { InvoicesPanelHeader } from './InvoicesPanelHeader';
import { InvoicesPanelBody } from './InvoicesPanelBody';
import { useClubs, useInvoicesForClub } from '@/hooks/useClubsAndInvoices';

import {
  clubsAtom,
  invoicesAtom,
  selectedClubAtom,
} from '@/store/store';

export const InvoicesPanel = () => {
  const [clubs, setClubs] = useAtom(clubsAtom);
  const [selectedClub, setSelectedClub] = useAtom(selectedClubAtom);
  const [invoices, setInvoices] = useAtom(invoicesAtom);

  const { data: clubsData } = useClubs();
  React.useEffect(() => {
    if (clubsData) {
      setClubs(clubsData);
      setSelectedClub(clubs[0]);
    }
  }, [clubs, clubsData, setClubs, setSelectedClub]);

  const { data: invoicesData } = useInvoicesForClub(selectedClub);
  React.useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData);
    }
  }, [invoicesData, setInvoices]);

  return (
    <>
      {selectedClub && <InvoicesPanelHeader />}
      {invoices && <InvoicesPanelBody />}
    </>
  );
};
