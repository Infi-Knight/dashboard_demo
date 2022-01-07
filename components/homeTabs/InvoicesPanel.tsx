import * as React from 'react';
import { InvoicesPanelHeader } from './InvoicesPanelHeader';
import { InvoicesPanelBody } from './InvoicesPanelBody';
import { useClubs, useInvoicesForClub } from '@/hooks/useClubsAndInvoices';
import { Invoice, InvoiceStatus } from '@/types/invoice';

export const InvoicesPanel = React.memo(function InvoicesPanel() {
  const [appliedFilters, setAppliedFilters] = React.useState<InvoiceStatus[]>(
    []
  );
  const { data: clubsData } = useClubs();
  const [selectedClub, setSelectedClub] = React.useState('');

  React.useEffect(() => {
    if (clubsData) {
      setSelectedClub(clubsData[0]);
    }
  }, [clubsData]);

  const { data: invoicesData } = useInvoicesForClub(selectedClub);
  const [invoices, setInvoices] = React.useState<Invoice[]>(invoicesData);
  React.useEffect(() => {
    setInvoices(invoicesData);
  }, [invoicesData]);

  React.useEffect(() => {
    if (appliedFilters.length > 0) {
      const newInvoices = invoicesData.filter((invoice: Invoice) =>
        appliedFilters.includes(invoice.status)
      );
      setInvoices(newInvoices);
    } else setInvoices(invoicesData)
  }, [appliedFilters, invoicesData]);

  return (
    <>
      {clubsData && selectedClub !== '' && (
        <InvoicesPanelHeader
          clubs={clubsData}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          selectedClub={selectedClub}
          setSelectedClub={setSelectedClub}
        />
      )}
      {invoices && <InvoicesPanelBody invoices={invoices} />}
    </>
  );
});
