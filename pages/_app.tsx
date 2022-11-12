import '../styles/globals.css';
import '../styles/BookingForm.scss';
import '../styles/Calendar.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
