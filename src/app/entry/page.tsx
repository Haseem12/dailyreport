import AppLayout from '@/components/AppLayout';
import StockEntryForm from '@/components/StockEntryForm';

export default function EntryPage() {
  return (
    <AppLayout pageTitle="New Stock Report">
        <StockEntryForm />
    </AppLayout>
  );
}
