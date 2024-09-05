import ClientComponent from './order-totals/ClientComponent';
import Link from 'next/link';

export default function OrderTotalsPage() {
  return (
    <div>
      <h1>Vista Metals</h1>
      <ClientComponent />
      <Link href="/newOrder">
        Create a New Order
      </Link>
    </div>
  );
}