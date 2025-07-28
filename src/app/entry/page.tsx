
import AppLayout from '@/components/AppLayout';
import StockEntryForm from '@/components/StockEntryForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function EntryPage() {
  return (
    <AppLayout pageTitle="New Stock Report">
        <Card>
            <CardHeader>
                <CardTitle>Daily Stock Check</CardTitle>
                <CardDescription>Fill out the form to submit a new stock report for a customer visit.</CardDescription>
            </CardHeader>
            <CardContent>
                <StockEntryForm />
            </CardContent>
        </Card>
    </AppLayout>
  );
}
