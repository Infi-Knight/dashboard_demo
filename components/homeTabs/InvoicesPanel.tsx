import * as React from 'react';
import { InvoicesPanelHeader } from './InvoicesPanelHeader';
import { InvoicesPanelBody } from './InvoicesPanelBody';
import { useClubs, useInvoicesForClub } from '@/hooks/useClubsAndInvoices';

export const InvoicesPanel = React.memo(function InvoicesPanel() {
  const { data: clubsData } = useClubs();
  const [selectedClub, setSelectedClub] = React.useState('');

  React.useEffect(() => {
    if (clubsData) {
      setSelectedClub(clubsData[0]);
    }
  }, [clubsData]);

  const { data: invoicesData } = useInvoicesForClub(selectedClub);
  const [invoices, setInvoices] = React.useState(invoicesData);
  React.useEffect(() => {
    setInvoices(invoicesData);
  }, [invoicesData]);

  return (
    <>
      {clubsData && selectedClub !== '' && (
        <InvoicesPanelHeader
          clubs={clubsData}
          selectedClub={selectedClub}
          setSelectedClub={setSelectedClub}
        />
      )}
      {invoices && <InvoicesPanelBody invoices={invoices} />}
    </>
  );
});
