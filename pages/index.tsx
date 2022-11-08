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
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <main>
        <BookingForm />
      </main>
    </div>
  );
}
