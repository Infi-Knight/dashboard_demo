import * as React from 'react';
import { useClubsAndInvoices } from '@/hooks/useClubsAndInvoices';
import { Invoice } from '@/types/invoice';
import { InvoicesPanelHeader } from './InvoicesPanelHeader';
import { InvoicesPanelBody } from './InvoicesPanelBody';

export const InvoicesPanel = React.memo(function InvoicesPanel() {
  // use a InvoiceProvider here that provides access to selected club, it's invoices and associated filters
  // by using a custom reducer, with multiple updaters etc
  const { clubsAndInvoices, isError, isLoading } = useClubsAndInvoices();
  const [clubs, setClubs] = React.useState<string[]>([]);
  const [selectedClub, setSelectedClub] = React.useState('');
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  React.useEffect(() => {
    if (clubsAndInvoices) {
      setClubs(clubsAndInvoices.map(({ club }) => club));
    }
  }, [clubsAndInvoices]);

  React.useEffect(() => {
    if (clubs) {
      setSelectedClub(clubs[0]);
    }
  }, [clubs]);

  React.useEffect(() => {
    if (clubsAndInvoices) {
      const temp = clubsAndInvoices.find((item) => item.club === selectedClub);
      if (temp) {
        setInvoices(temp.invoices);
      }
    }
  }, [clubsAndInvoices, selectedClub]);

  if (isError) {
    return <p>failed to load...</p>;
  }

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (clubs && invoices && selectedClub !== '') {
    return (
      <>
        <InvoicesPanelHeader clubs={clubs} defaultClub={selectedClub} />
        <InvoicesPanelBody invoices={invoices} />
      </>
    );
  }

  return <p>this should not be possible</p>;
});

