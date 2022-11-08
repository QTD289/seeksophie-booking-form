import Head from 'next/head';

import { BookingForm } from '../components';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Seek Sophie</title>
        <meta name="description" content="Seek Sophie take home test" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>

      <main>
        <BookingForm />
      </main>
    </div>
  );
}
