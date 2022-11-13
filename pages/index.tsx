import Head from 'next/head';

import { useFormStore } from 'stores';

import { BookingForm } from '../components';

export default function Home() {
  const { showingCalendar, toggleCalendar } = useFormStore();

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
        {showingCalendar && (
          <div className="overlay" onClick={toggleCalendar} />
        )}
        <BookingForm />
      </main>
    </div>
  );
}
