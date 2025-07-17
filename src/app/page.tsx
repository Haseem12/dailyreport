import AppLayout from '@/components/AppLayout';
import StockReportDashboard from '@/components/StockReportDashboard';

export default function DashboardPage() {
  return (
    <AppLayout pageTitle="Dashboard">
      <StockReportDashboard />
    </AppLayout>
  );
}
