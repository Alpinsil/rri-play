import Head from 'next/head';
import Cardcomp from '../components/cardcomp';
import FlashMessage from '../components/flashmessage';
import Navbar from '../components/navbar';

export async function getServerSideProps() {
  try {
    const res = await fetch('https://go-rriaudiobook-server-production.up.railway.app/api/books');
    const books = await res.json();

    return {
      props: { books },
    };
  } catch (err) {
    return {
      props: { books: false },
    };
  }
}

export default function Home({ books }) {
  const { data } = books;

  if (!books) {
    return (
      <>
        <Head>
          <title>RRI PlayBook</title>
        </Head>
        <Navbar />
        <FlashMessage isVisible={true} text={['error fetching', 'server error', true]} />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>RRI PlayBook</title>
        </Head>
        <Navbar />
        <div className="flex justify-center mt-7 gap-10 flex-wrap w-full mx-auto">{data ? data.map((ar) => <Cardcomp key={ar.id} thumbnail={ar.cover_image} title={ar.title} id={ar.id} desc={ar.category} />) : <p className="text-white text-2xl"> List buku tidak ditemukan</p>}</div>
      </>
    );
  }
}
