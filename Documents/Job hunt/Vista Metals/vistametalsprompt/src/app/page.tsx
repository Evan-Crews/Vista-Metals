import ClientComponent from './order-totals/ClientComponent';
import Link from 'next/link';
import styles from './HomePage.module.css';

export default function OrderTotalsPage() {
  return (
    <div className='main_body'>
      <h1 className='title'>Vista Metals</h1>
      <div className='order_number'>
        <ClientComponent />
      </div>
      <Link href="/newOrder" className='new_order_button'>
        Create a New Order
      </Link>
    </div>
  );
}